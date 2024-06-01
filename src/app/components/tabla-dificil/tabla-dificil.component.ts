import { Component, OnInit } from '@angular/core';
import { Posicion } from 'src/app/interfaces/posicion';
import { PosicionesService } from 'src/app/services/posiciones/posiciones.service';

@Component({
  selector: 'app-tabla-dificil',
  templateUrl: './tabla-dificil.component.html',
  styleUrls: ['./tabla-dificil.component.scss'],
})
export class TablaDificilComponent implements OnInit {
  posicionesDificil: Posicion[] = [];

  constructor(private posicionesService: PosicionesService) {}

  ngOnInit(): void {
    this.posicionesService
      .ObtenerPosicionesPorNivel('dificil')
      .subscribe((posiciones: Posicion[]) => {
        this.posicionesDificil = posiciones;
      });
  }
}
