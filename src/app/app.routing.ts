import { RouterModule, Routes } from '@angular/router';

// Componentes
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';


const routes: Routes = [
    { path: 'fotos', component: FotosComponent },
    { path: 'carga', component: CargaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];

export const appRouting = RouterModule.forRoot(routes);
