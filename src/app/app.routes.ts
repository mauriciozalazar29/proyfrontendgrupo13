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

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'favoritos', component: FavoritosComponent },

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
        ],
    }
];
