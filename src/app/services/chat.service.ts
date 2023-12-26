import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { IChatRoom } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /* 
   - get rooms
   - add room
   - get room messages
   - send message
   - delete room
   - 
  */

  constructor(private db: AngularFirestore) { }

  public getRooms(): Observable<Array<IChatRoom>> {
    return this.db.collection('rooms').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const id = snap.payload.doc.id;
        const data: IChatRoom = <IChatRoom> snap.payload.doc.data();
        return <IChatRoom>{
          ...data,
          id
        }
      })
    }))
  }
}
