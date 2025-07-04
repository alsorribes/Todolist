//Fitxer on tindrem les rutes definides per les diferents vistes

import { RouterModule, Routes } from '@angular/router';
import { About } from './components/about/about';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', component: Home}, //Només podem tenir un path amb '' que serà el que gestionarà tot (arrel)
    { path: 'about', component: About },
];