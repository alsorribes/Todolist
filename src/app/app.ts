// Component principal de la aplicació

import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// IMPORTANTE: Usar standalone components en lugar de IonicModule
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    FormsModule, 
    RouterModule, 
    IonApp, 
    IonRouterOutlet
  ], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'ToDoList';
}