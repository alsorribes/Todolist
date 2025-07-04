//Fitxer on tindrem les rutes definides per les diferents vistes

import { RouterModule, Routes } from '@angular/router';
import { About } from './components/about/about';
import { Home } from './components/home/home';
import { Completed } from './components/completed/completed';
import { Edit } from './components/edit/edit';

export const routes: Routes = [
    { path: '', component: Home }, //Només podem tenir un path amb '' que serà el que gestionarà tot (arrel)
    { path: 'about', component: About }, //Ruta per la vista del component /about
    { path: 'completed', component: Completed }, //Ruta per la vista del component /completed
    { path: 'edit/:id', component: Edit} //Ruta per la vista del component /edit (:id -> indica que es un paràmetre dinamic)
];