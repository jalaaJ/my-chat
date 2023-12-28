import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { IChatRoom, IMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /* 
   - get rooms - done
   - add room - done
   - get room messages - done
   - send message - in progress
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

  public getRoomMessages(roomId: string): Observable<Array<IMessage>> {
    return this.db.collection('rooms').doc(roomId).collection("messages").snapshotChanges()
    .pipe(map(messages => {
      return messages.map(message => {
        const data: IMessage = <IMessage> message.payload.doc.data();
        const id = message.payload.doc.id;
        return <IMessage> {
          ...data,
          id
        }
      })
    }))
  }

  public addRoom(room_Name: string, userId: string): void {
    this.db.collection("rooms").add({
      roomName: room_Name,
      createdUserId: userId
    })
  }

  public sendMessage(userId: string, body: string, roomId: string): void {
    this.db.collection("rooms").doc(roomId).collection('messages').add({
      userId,
      timestamp: new Date().getTime(),
      body 
    })
  }

}
