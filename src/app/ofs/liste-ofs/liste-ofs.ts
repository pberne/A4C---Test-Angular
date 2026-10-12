import { Component, inject, signal} from '@angular/core';
import { OrdreFabricationService } from '../services/ordre-fabrication-service';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  imports: [HlmButton],
  selector: 'app-liste-ofs',
  styleUrl: './liste-ofs.css',
  templateUrl: './liste-ofs.html',
})

export class ListeOfs {
   protected readonly titre = signal('Liste des OFs');
   protected readonly ofService = inject(OrdreFabricationService);
   constructor() {
      this.ofService.chargerOfs();
   }
   readonly ofListe = this.ofService.ofListe;
}

