import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment.development';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ToastComponent } from './components/toast/toast.component';
import { InitComponent } from './components/init/init.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemoryCardComponent } from './components/memory-card/memory-card.component';
import { InitMedioComponent } from './components/init-medio/init-medio.component';
import { DificilComponent } from './components/dificil/dificil.component';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { TablaPosicionesComponent } from './componenets/tabla-posiciones/tabla-posiciones.component';
import { TablaMedioComponent } from './components/tabla-medio/tabla-medio.component';
import { TablaDificilComponent } from './components/tabla-dificil/tabla-dificil.component';
import { TablaFacilComponent } from './components/tabla-facil/tabla-facil.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, LoginComponent, HomeComponent, ToastComponent, InitComponent, MemoryCardComponent, InitMedioComponent, DificilComponent, TablaPosicionesComponent, TablaMedioComponent,TablaDificilComponent, TablaFacilComponent],
  imports: [
    BrowserModule,
     IonicModule.forRoot(), 
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    MenuComponent, LoginComponent,HomeComponent,ToastComponent, InitComponent, MemoryCardComponent, InitMedioComponent, DificilComponent, TablaPosicionesComponent, TablaMedioComponent, TablaDificilComponent, TablaFacilComponent // Agrega el componente en la sección de exports
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
