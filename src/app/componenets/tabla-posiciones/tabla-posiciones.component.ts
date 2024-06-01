import { Component, OnInit } from '@angular/core';
import { Posicion } from 'src/app/interfaces/posicion';
import { PosicionesService } from 'src/app/services/posiciones/posiciones.service';

@Component({
  selector: 'app-tabla-posiciones',
  templateUrl: './tabla-posiciones.component.html',
  styleUrls: ['./tabla-posiciones.component.scss'],
})
export class TablaPosicionesComponent implements OnInit {
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
