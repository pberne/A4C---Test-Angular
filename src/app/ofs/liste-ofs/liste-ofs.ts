import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-liste-ofs',
  styleUrl: './liste-ofs.css',
  templateUrl: './liste-ofs.html',
})
export class ListeOfs {
  protected readonly titre = signal('Liste des Ofs');
}
