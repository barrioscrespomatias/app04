import { Component, OnInit } from '@angular/core';
import { Posicion } from 'src/app/interfaces/posicion';
import { PosicionesService } from 'src/app/services/posiciones/posiciones.service';

@Component({
  selector: 'app-tabla-medio',
  templateUrl: './tabla-medio.component.html',
  styleUrls: ['./tabla-medio.component.scss'],
})
export class TablaMedioComponent implements OnInit {
  posicionesMedio: Posicion[] = [];

  constructor(private posicionesService: PosicionesService) {}

  ngOnInit(): void {
    this.posicionesService
      .ObtenerPosicionesPorNivel('medio')
      .subscribe((posiciones: Posicion[]) => {
        this.posicionesMedio = posiciones;
      });
  }
}
