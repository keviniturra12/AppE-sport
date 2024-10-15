import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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

}
