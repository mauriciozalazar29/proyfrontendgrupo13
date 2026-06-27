import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {BebidasComponent} from './components/bebidas/bebidas.component';
import {FavoritosComponent} from './components/favoritos/favoritos.component';
import {MesaComponent} from './components/mesa/mesa.component';
import {PlatosComponent} from './components/platos/platos.component';
import {PostresComponent} from './components/postres/postres.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'bebidas', component: BebidasComponent},
    {path: 'favoritos', component: FavoritosComponent},
    {path: 'home', component: HomeComponent},
    {path: 'mesa', component: MesaComponent},
    {path: 'platos', component: PlatosComponent},
    {path: 'postres', component: PostresComponent},
];
