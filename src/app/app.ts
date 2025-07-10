// Component principal de la aplicació

import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterModule, IonicModule], //Feia falta importar RouterModule perque el botó de Sobre fos clicable, perquè Angular sino no reconeix routerLink (a app.html) i ho renderitza com a text.
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'ToDoList';
}