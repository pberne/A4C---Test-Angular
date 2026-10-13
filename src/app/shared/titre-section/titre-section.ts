import { Component, booleanAttribute, input } from '@angular/core';

/**
 * Titre orange centré souligné d'une barre, comme dans les écrans WinDev.
 * Usage : <app-titre-section titre="Liste des Ofs" />  ou  <app-titre-section titre="Bon de coupe" petit />
 */
@Component({
  selector: 'app-titre-section',
  template: `
    <h2 class="text-primary text-center font-bold" [class]="petit() ? 'text-2xl' : 'text-3xl'">
      {{ titre() }}
    </h2>
    <!-- [class.h-1.5] ne fonctionne pas (le point est mal interprété) : on passe la classe entière en texte. -->
    <div class="bg-primary rounded-full" [class]="petit() ? 'h-1' : 'h-1.5'"></div>
  `,
})
export class TitreSection {
  readonly titre = input.required<string>();
  readonly petit = input(false, { transform: booleanAttribute });
}
