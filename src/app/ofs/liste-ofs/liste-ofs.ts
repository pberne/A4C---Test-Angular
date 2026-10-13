import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { TitreSection } from '../../shared/titre-section/titre-section';
import { OrdreFabrication } from '../models/ordre-fabrication';
import { ID_STATUT_TERMINE, OrdreFabricationStatut } from '../models/ordre-fabrication-statut';
import { OrdreFabricationService } from '../services/ordre-fabrication-service';

type ColonneTri = 'numero' | 'client' | 'type' | 'statut' | 'reference' | 'quantite' | 'reste';

interface Colonne {
  cle: ColonneTri;
  libelle: string;
  numerique: boolean;
}

@Component({
  imports: [FormsModule, HlmButton, HlmInput, HlmTableImports, TitreSection],
  selector: 'app-liste-ofs',
  styleUrl: './liste-ofs.css',
  templateUrl: './liste-ofs.html',
})
export class ListeOfs {
  private readonly router = inject(Router);
  protected readonly ofService = inject(OrdreFabricationService);

  protected readonly colonnes: Colonne[] = [
    { cle: 'numero', libelle: 'OF', numerique: true },
    { cle: 'client', libelle: 'Client', numerique: false },
    { cle: 'type', libelle: 'Type', numerique: false },
    { cle: 'statut', libelle: 'Statut', numerique: false },
    { cle: 'reference', libelle: 'Ref. Produit', numerique: false },
    { cle: 'quantite', libelle: 'Quantité Cmd', numerique: true },
    { cle: 'reste', libelle: 'Reste à livrer', numerique: true },
  ];

  // --- Sélection ---------------------------------------------------------
  protected readonly numeroSelectionne = signal<number | null>(null);
  protected readonly ofSelectionne = computed(
    () => this.ofService.ofListe().find((ordre) => ordre.numero === this.numeroSelectionne()) ?? null,
  );

  // --- Filtres -----------------------------------------------------------
  protected readonly afficherTous = signal(false);
  protected readonly statutFiltre = signal<number | null>(null);
  protected readonly statutsDisponibles = computed(() => {
    const statuts = new Map<number, OrdreFabricationStatut>();
    for (const ordre of this.ofService.ofListe()) {
      statuts.set(ordre.statut.id, ordre.statut);
    }
    return [...statuts.values()].sort((a, b) => a.id - b.id);
  });

  // --- Tri ---------------------------------------------------------------
  protected readonly colonneTri = signal<ColonneTri>('numero');
  protected readonly sensTri = signal<'asc' | 'desc'>('desc');

  /** La liste réellement affichée : filtrée puis triée. La liste du service n'est jamais modifiée. */
  protected readonly ofsAffiches = computed(() => {
    let liste = this.ofService.ofListe();
    if (!this.afficherTous()) {
      liste = liste.filter((ordre) => ordre.statut.id !== ID_STATUT_TERMINE);
    }
    const statut = this.statutFiltre();
    if (statut !== null) {
      liste = liste.filter((ordre) => ordre.statut.id === statut);
    }
    const colonne = this.colonneTri();
    const sens = this.sensTri() === 'asc' ? 1 : -1;
    // [...liste] : on trie une COPIE, car sort() modifie le tableau sur place.
    return [...liste].sort((a, b) => comparer(valeurTri(a, colonne), valeurTri(b, colonne)) * sens);
  });

  // --- Commentaire -------------------------------------------------------
  /** Modifiable par la saisie, mais revient au commentaire de l'OF dès que la sélection change. */
  protected readonly commentaireSaisi = linkedSignal(() => this.ofSelectionne()?.commentaire ?? '');
  protected readonly commentaireModifie = computed(
    () => this.commentaireSaisi() !== (this.ofSelectionne()?.commentaire ?? ''),
  );

  constructor() {
    this.ofService.chargerOfsSiBesoin();
  }

  protected selectionner(ordre: OrdreFabrication) {
    this.numeroSelectionne.set(ordre.numero);
  }

  protected ouvrirFiche(numero = this.numeroSelectionne()) {
    if (numero !== null) {
      this.router.navigate(['/ofs', numero]);
    }
  }

  protected trier(colonne: ColonneTri) {
    if (this.colonneTri() === colonne) {
      this.sensTri.update((sens) => (sens === 'asc' ? 'desc' : 'asc'));
    } else {
      this.colonneTri.set(colonne);
      this.sensTri.set('asc');
    }
  }

  protected indicateurTri(colonne: ColonneTri): string {
    if (this.colonneTri() !== colonne) {
      return '';
    }
    return this.sensTri() === 'asc' ? '▲' : '▼';
  }

  protected actualiser() {
    this.ofService.chargerOfs();
  }

  protected basculerAfficherTous() {
    this.afficherTous.update((valeur) => !valeur);
  }

  protected validerCommentaire() {
    const numero = this.numeroSelectionne();
    if (numero !== null) {
      this.ofService.modifierCommentaire(numero, this.commentaireSaisi());
    }
  }

  protected annulerCommentaire() {
    this.commentaireSaisi.set(this.ofSelectionne()?.commentaire ?? '');
  }
}

function valeurTri(ordre: OrdreFabrication, colonne: ColonneTri): string | number {
  // Le statut est un objet : on trie sur son code.
  return colonne === 'statut' ? ordre.statut.id : ordre[colonne];
}

function comparer(a: string | number, b: string | number): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b));
}
