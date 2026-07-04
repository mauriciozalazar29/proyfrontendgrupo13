import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { CajaComponent } from './components/caja/caja.component';
import { PlatosComponent } from './components/platos/platos.component';
import { PostresComponent } from './components/postres/postres.component';
import { LayoutPedidoComponent } from './components/layout-pedido/layout-pedido.component';
import { QrComponent } from './components/qr/qr';
import { CocinaComponent } from './components/cocina/cocina.component';
import { Login } from './components/login/login';
import { Usuario } from './components/usuario/usuario';
import { UsuarioForm } from './components/usuario-form/usuario-form';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'favoritos', component: FavoritosComponent },

    { path: 'usuario', component: Usuario },
    { path: 'usuario-form', component: UsuarioForm },
    { path: 'usuario-form/:id', component: UsuarioForm },

    { path: 'qr/:idMesa', component: QrComponent },
    {
        path: '', component: LayoutPedidoComponent,
        children: [   // bebidas, platos, postres usaran el layout de pedido
            { path: 'bebidas', component: BebidasComponent },
            { path: 'platos', component: PlatosComponent },
            { path: 'postres', component: PostresComponent },
            { path: 'home', component: HomeComponent },
            { path: 'mesa', component: MesaComponent },
            { path: 'caja', component: CajaComponent },
            {path: 'cocina', component: CocinaComponent},
        ],
    }
];
