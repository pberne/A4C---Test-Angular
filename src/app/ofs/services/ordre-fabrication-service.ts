import { HttpClient } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';
import { OrdreFabrication } from '../models/ordre-fabrication';

@Service()
export class OrdreFabricationService {
    private readonly httpClient = inject(HttpClient);

    private readonly _ofListe = signal<OrdreFabrication[]>([]);

    readonly totalOFs = computed(() => this.ofListe().length);

    chargerOfs() {
        this.httpClient.get<OrdreFabrication[]>('data/ofs.json').subscribe(
            (ofs) => {
                this._ofListe.set(ofs);
            }
        );
    }

    readonly ofListe = this._ofListe.asReadonly();


}
