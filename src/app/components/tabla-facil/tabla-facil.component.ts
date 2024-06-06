import { Component, OnInit } from '@angular/core';
import { Posicion } from 'src/app/interfaces/posicion';
import { PosicionesService } from 'src/app/services/posiciones/posiciones.service';

@Component({
  selector: 'app-tabla-facil',
  templateUrl: './tabla-facil.component.html',
  styleUrls: ['./tabla-facil.component.scss'],
})
export class TablaFacilComponent  implements OnInit {

  posicionesFacil: Posicion[] = [];

  constructor(private posicionesService: PosicionesService) {}

  ngOnInit(): void {
    this.posicionesService
      .ObtenerPosicionesPorNivel('facil')
      .subscribe((posiciones: Posicion[]) => {
        this.posicionesFacil = posiciones;
      });
  }

}
