import { Component, signal } from '@angular/core';
import { ListeOfs } from './ofs/liste-ofs/liste-ofs';

@Component({
  imports: [ ListeOfs],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
}
