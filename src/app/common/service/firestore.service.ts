import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc, where, query } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { UserC } from '../interface/users';
import { ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore)

  constructor() { }

  getCollectionChanges<tipo>(path: string){
    const refCollection = collection(this.firestore, path);
    return collectionData(refCollection) as Observable<tipo[]>;
  }

  createDocumentID(data: any, enlace: string, idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data)
  }

  createIdDoc(){
    return uuidv4()
  }

    // Método para obtener usuario por email
    getUserByEmail(email: string): Observable<UserC[]> {
      const userRef = collection(this.firestore, 'usuarios');  // Colección de usuarios
      const q = query(userRef, where('email', '==', email));  // Consulta por email
      return collectionData(q, { idField: 'id' }) as Observable<UserC[]>;  // Devolvemos como Observable
    }
  
    

}
