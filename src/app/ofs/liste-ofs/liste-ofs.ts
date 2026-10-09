import { Component, inject} from '@angular/core';
import { OrdreFabricationService } from '../services/ordre-fabrication-service';

@Component({
  imports: [],
  selector: 'app-liste-ofs',
  styleUrl: './liste-ofs.css',
  templateUrl: './liste-ofs.html',
})

export class ListeOfs {
   protected readonly ofService = inject(OrdreFabricationService);
   constructor() {
      this.ofService.chargerOfs();
   }
   readonly ofListe = this.ofService.ofListe;
}

