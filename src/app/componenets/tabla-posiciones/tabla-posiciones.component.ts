import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Posicion } from 'src/app/interfaces/posicion';
import { PosicionesService } from 'src/app/services/posiciones/posiciones.service';

@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.component.html',
  styleUrls: ['./tabla-posiciones.component.scss'],
})
export class TablaPosicionesComponent implements OnInit {
  posicionesFacil: Posicion[] = [];

  constructor(private posicionesService: PosicionesService, private navCtrl:NavController, private router: Router) {}

  ngOnInit(): void {
    this.posicionesService
      .ObtenerPosicionesPorNivel('facil')
      .subscribe((posiciones: Posicion[]) => {
        this.posicionesFacil = posiciones;
      });
  }

  navigateTo(section: string) {
    this.navCtrl.navigateForward(`/${section}`);
  }

  tablaFacil() {
    this.router.navigate(['tabla-facil']);
  }

  tablaMedio() {
    this.router.navigate(['tabla-medio']);
  }

  tablaDificil() {
    this.router.navigate(['tabla-dificil']);
  }
}
