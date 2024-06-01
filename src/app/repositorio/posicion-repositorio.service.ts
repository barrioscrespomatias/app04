import { Injectable } from '@angular/core';
import { Repository } from 'src/app/servicesData/common-repository.interface';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Posicion } from 'src/app/interfaces/posicion';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PosicionRepositorioService
  implements Repository<Posicion>
{
  listadoPosiciones!: CollectionReference<DocumentData>;
  listadoPosiciones$!: Observable<Posicion[]>;
  firestoreService: AngularFirestore;

  constructor(firestoreService: AngularFirestore) {
    this.firestoreService = firestoreService;
    // const citiesRef = collection(db, "cities");

    this.listadoPosiciones$ = collectionData(
      this.listadoPosiciones
    ) as Observable<Posicion[]>;

    // const posicionesCollection = this.firestore.collection('posiciones');
  }
  getAll(): Observable<any> {
    return this.listadoPosiciones$;

    // const posicionesCollection = this.firestore.collection('posiciones');
  }

    // Método para agregar un registro a una colección específica
    addItem(collectionName: string, item: any): Promise<any> {
      return this.firestoreService.collection(collectionName).add(item);
    }

  // create() {
  //   const data = { name: 'John Doe', age: 30 };
  //   this.firestoreService.createRecord(data)
  //     .then(() => {
  //       console.log('Registro creado correctamente');
  //     })
  //     .catch((error) => {
  //       console.error('Error al crear el registro:', error);
  //     });
  // }

  create(entity: Posicion): string {
    // if (this.listadoPosiciones) {
      let docRef: DocumentReference<DocumentData> = doc(this.listadoPosiciones);
      const newItem: any = {
        ...entity,
        docRef: docRef.id,
      };

      setDoc(docRef, newItem);
      return docRef.id;
    // }
    // return "";
  }
  update(docRef: string, ...args: unknown[]): boolean {
    // console.log(docRef);
    // try {
    //   const documentReference = doc(this.listadoPosiciones, docRef);

    //   updateDoc(documentReference, { estado: 'nuevo_estado' });
    // } catch (e) {
    //   console.log(e);
    // }
    return false;
  }
  delete(docRef: string): boolean {
    // try {
    //   console.log(docRef);
    //   const documentReference = doc(this.listadoPosiciones, docRef);

    //   deleteDoc(documentReference);

    //   return true;
    // } catch (error) {
    //   console.log(error);
      return false;
  //   }
  } 
}