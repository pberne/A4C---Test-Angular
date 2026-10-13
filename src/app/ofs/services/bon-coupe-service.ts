import { HttpClient } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { API_URL } from '../../api.config';
import { BonCoupe } from '../models/bon-coupe';

@Service()
export class BonCoupeService {
    private readonly httpClient = inject(HttpClient);

    private readonly _bonsCoupe = signal<BonCoupe[]>([]);
    private readonly _charge = signal(false);

    readonly bonsCoupe = this._bonsCoupe.asReadonly();

    chargerSiBesoin() {
        if (this._charge()) {
            return;
        }
        this._charge.set(true);
        this.httpClient.get<BonCoupe[]>(`${API_URL}/bons-coupe.json`).subscribe({
            next: (bons) => this._bonsCoupe.set(bons),
            error: () => this._charge.set(false),
        });
    }
}
