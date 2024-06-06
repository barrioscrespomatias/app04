import { Injectable } from '@angular/core';
import { Repository } from 'src/app/servicesData/common-repository.interface';
import { Observable, Subscription } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Posicion } from 'src/app/interfaces/posicion';
import { PosicionRepositorioService } from 'src/app/repositorio/posicion-repositorio.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class PosicionesService {
  //#region Propiedades
  listadoPosicionesModelo?: Posicion[];
  subscription?: Subscription;
  //#endregion

  //#region Constructor
  constructor(
    private posicionRepositorioService: PosicionRepositorioService,
    private db: AngularFirestore
  ) {
  }
  //#endregion

  //#region Métodos
  async Crear(posicionRegistro: Posicion): Promise<{ mensaje: string; valido: boolean }> {
    try {
      // Asegurarse de que 'tiempo' se guarda como número
      posicionRegistro.tiempo = parseFloat(posicionRegistro.tiempo as any);
      
      await this.db.collection('posiciones').add(posicionRegistro);

      return {
        mensaje: 'Posición creada correctamente',
        valido: true,
      };
    } catch (err) {
      console.log(err);
      let errorMensaje = 'Hubo un error al intentar registrar la posición';
      if (err instanceof FirebaseError) {
        // Gestionar errores específicos de Firebase si es necesario
      }
      return { mensaje: errorMensaje, valido: false };
    }
  }

  ObtenerPosicionesPorNivel(nivel: string): Observable<Posicion[]> {
    return this.db.collection<Posicion>('posiciones', ref => ref.where('nivel', '==', nivel)
                                                                .orderBy('tiempo', 'asc')
                                                                .limit(10))
                 .valueChanges();
  }

  async TraerTodos() {
    return this.posicionRepositorioService.getAll();
  }

  async TraerTodas() {
    return new Promise((resolve, reject) => {
      this.db
        .collection('posiciones')
        .valueChanges()
        .subscribe(
          (datos) => {
            resolve(datos);
          },
          (error) => reject(error)
        );
    });
  }
  //#endregion
}