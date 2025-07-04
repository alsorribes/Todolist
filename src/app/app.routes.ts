//Fitxer on tindrem les rutes definides per les diferents vistes

import { RouterModule, Routes } from '@angular/router';
import { About } from './components/about/about';
import { Home } from './components/home/home';
import { Completed } from './components/completed/completed';

export const routes: Routes = [
    { path: '', component: Home}, //Només podem tenir un path amb '' que serà el que gestionarà tot (arrel)
    { path: 'about', component: About }, //Ruta per la vista del component /about
    { path: 'completed', component: Completed} //Ruta per la vista del component /completed
];