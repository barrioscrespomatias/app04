import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { InitComponent } from './components/init/init.component';
import { InitMedioComponent } from './components/init-medio/init-medio.component';
import { DificilComponent } from './components/dificil/dificil.component';
import { TablaPosicionesComponent } from './componenets/tabla-posiciones/tabla-posiciones.component';
import { TablaMedioComponent } from './components/tabla-medio/tabla-medio.component';
import { TablaDificilComponent } from './components/tabla-dificil/tabla-dificil.component';
import { TablaFacilComponent } from './components/tabla-facil/tabla-facil.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  //normal loading
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent},
  { path: 'facil', component: InitComponent},
  { path: 'medio', component: InitMedioComponent},
  { path: 'dificil', component: DificilComponent},
  { path: 'home', component: HomeComponent },
  { path: 'tabla-posiciones', component: TablaPosicionesComponent},
  { path: 'tabla-facil', component: TablaFacilComponent},
  { path: 'tabla-medio', component: TablaMedioComponent},
  { path: 'tabla-dificil', component: TablaDificilComponent},
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
