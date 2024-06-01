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
    // if (!this.subscription) {
    //   this.subscription =
    //     this.posicionRepositorioService.listadoPosiciones$.subscribe(
    //       (data) => {
    //         this.listadoPosicionesModelo = data;
    //       }
    //     );
    //     this.subscription.unsubscribe();
    // }

    // End constructor
  }
  //#endregion

  //#region Métodos
  async Crear(
    posicionRegistro: Posicion
  ): Promise<{ mensaje: string; valido: boolean }> {
    try {
      let posicionDocRef =
        this.posicionRepositorioService.addItem("posiciones" ,posicionRegistro);

      return {
        mensaje: 'posicion creada correctamente',
        valido: true,
      };
    } catch (err) {
      console.log(err);
      let errorMensaje = 'Hubo un error al intentar registrar la posicion';
      if (err instanceof FirebaseError) {
        // if (err.code == 'auth/email-already-in-use') {
        //   errorMensaje = 'El email ingresado ya existe, ingrese otro';
        // }
      }
      return { mensaje: errorMensaje, valido: false };
    }
  }

  ObtenerPosicionesPorNivel(nivel: string): Observable<Posicion[]> {
    return this.db.collection<Posicion>('posiciones', ref => ref.where('nivel', '==', nivel)
                                                                .orderBy('tiempo','asc')
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