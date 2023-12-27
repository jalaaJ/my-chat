import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, filter, pipe } from 'rxjs';
import { IChatRoom, IMessage } from 'src/app/models';
import { ChatService } from 'src/app/services/chat.service';
import { AddRoomComponent } from '../add-room/add-room.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit{

  public rooms$: Observable<Array<IChatRoom>> | undefined;
  public messages$: Observable<Array<IMessage>> | undefined;
  private userId: string = "";

  constructor(private chatService: ChatService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {

      this.authService.getUserData().pipe(filter(data => !!data)).subscribe(user => {
        this.userId = <string> user?.uid;
      })

      this.rooms$ = this.chatService.getRooms();
      // This is the initial id
      const roomId = this.activatedRoute.snapshot.url[1].path
      this.messages$ = this.chatService.getRoomMessages(roomId);
      // This method is to get the id on every event change in the router
      this.router.events.pipe(filter(data => data instanceof(NavigationEnd))).subscribe(data => {
        const routerEvent: RouterEvent = <RouterEvent> data;
        const urlArray = routerEvent.url.split("/");
        if(urlArray.length > 2) {
          const updatedRoomId = urlArray[2]
          this.messages$ = this.chatService.getRoomMessages(updatedRoomId);
        }
      })
  }

  public openAddRoomModal(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onAddRoom(result, this.userId);
    });
  }
  
  public onAddRoom(roomName: string, userId: string): void {
    this.chatService.addRoom(roomName, userId);
  }
}
