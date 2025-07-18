import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/core/loader';

// Configuración correcta de Ionic
defineCustomElements(window);

bootstrapApplication(App, {
  providers: [
    provideRouter(routes), 
    provideIonicAngular({
      // Configuración específica para Ionic standalone
      mode: 'ios', // o 'md' para Material Design
      animated: true
    })
  ]
}).catch(err => console.error(err));