import { Component} from '@angular/core';
import { OrdreFabrication } from '../models/ordre-fabrication';

@Component({
  imports: [],
  selector: 'app-liste-ofs',
  styleUrl: './liste-ofs.css',
  templateUrl: './liste-ofs.html',
})
export class ListeOfs {
   protected readonly of: OrdreFabrication = {
    numero: 123,
    client: 'Client A',
    type: 'OF1',
    statut: { id: 1, libelle: 'En cours' },
    reference: 'REF123',
    quantite: 100,
    reste: 50,
    depotTable: 'Site A',
    depotCoupe: 'Site B',
  }
}

