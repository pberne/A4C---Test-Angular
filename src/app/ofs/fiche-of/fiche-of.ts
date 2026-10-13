import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, numberAttribute, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { TitreSection } from '../../shared/titre-section/titre-section';
import { BonCoupeService } from '../services/bon-coupe-service';
import { OrdreFabricationService } from '../services/ordre-fabrication-service';

@Component({
  imports: [DatePipe, RouterLink, HlmButton, HlmInput, HlmLabel, HlmTableImports, HlmTabsImports, TitreSection],
  selector: 'app-fiche-of',
  templateUrl: './fiche-of.html',
})
export class FicheOf {
  private readonly bonCoupeService = inject(BonCoupeService);
  protected readonly ofService = inject(OrdreFabricationService);

  /** Rempli automatiquement par le router à partir de l'URL /ofs/:numero (withComponentInputBinding). */
  readonly numero = input.required({ transform: numberAttribute });

  protected readonly ordre = computed(() => this.ofService.ofListe().find((o) => o.numero === this.numero()));
  protected readonly nbLivre = computed(() => {
    const ordre = this.ordre();
    return ordre ? ordre.quantite - ordre.reste : 0;
  });

  protected readonly bonsCoupe = computed(() =>
    this.bonCoupeService.bonsCoupe().filter((bon) => bon.ordreFabricationId === this.numero()),
  );
  protected readonly totalQuantiteOf = computed(() =>
    this.bonsCoupe().reduce((total, bon) => total + bon.quantiteOf, 0),
  );
  protected readonly totalQuantiteRecoupe = computed(() =>
    this.bonsCoupe().reduce((total, bon) => total + bon.quantiteRecoupe, 0),
  );

  protected readonly onglets = [
    { id: 'bdc', libelle: 'Bdc' },
    { id: 'bdp', libelle: 'Bdp' },
    { id: 'bdd', libelle: 'BDD' },
    { id: 'bf', libelle: 'BF' },
    { id: 'bpa', libelle: 'BPA' },
    { id: 'rec', libelle: 'Rec.' },
    { id: 'dest', libelle: 'Dest.' },
  ];

  protected readonly numeroCopie = signal(false);

  constructor() {
    // Permet d'ouvrir directement /ofs/4487312 (favori, F5) sans passer par la liste.
    this.ofService.chargerOfsSiBesoin();
    this.bonCoupeService.chargerSiBesoin();
  }

  protected async copierNumero() {
    await navigator.clipboard.writeText(String(this.numero()));
    this.numeroCopie.set(true);
    setTimeout(() => this.numeroCopie.set(false), 2000);
  }
}
