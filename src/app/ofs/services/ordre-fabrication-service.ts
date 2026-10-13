import { HttpClient } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';
import { API_URL } from '../../api.config';
import { OrdreFabrication } from '../models/ordre-fabrication';

@Service()
export class OrdreFabricationService {
    private readonly httpClient = inject(HttpClient);

    private readonly _ofListe = signal<OrdreFabrication[]>([]);
    private readonly _chargement = signal(false);
    private readonly _erreur = signal<string | null>(null);

    readonly ofListe = this._ofListe.asReadonly();
    readonly chargement = this._chargement.asReadonly();
    readonly erreur = this._erreur.asReadonly();
    readonly totalOFs = computed(() => this.ofListe().length);

    /** Recharge toujours depuis la source (bouton « Actualiser »). */
    chargerOfs() {
        this._chargement.set(true);
        this._erreur.set(null);
        this.httpClient.get<OrdreFabrication[]>(`${API_URL}/ofs.json`).subscribe({
            next: (ofs) => {
                this._ofListe.set(ofs);
                this._chargement.set(false);
            },
            error: () => {
                this._erreur.set('Impossible de charger les OFs.');
                this._chargement.set(false);
            },
        });
    }

    /** Charge seulement si rien n'est encore en mémoire (ouverture d'un écran). */
    chargerOfsSiBesoin() {
        if (this._ofListe().length === 0 && !this._chargement()) {
            this.chargerOfs();
        }
    }

    /** Avec une vraie API, on enverrait ici un PUT au serveur avant de mettre à jour le signal. */
    modifierCommentaire(numero: number, commentaire: string) {
        this._ofListe.update((liste) =>
            liste.map((ordre) => (ordre.numero === numero ? { ...ordre, commentaire } : ordre)),
        );
    }
}
