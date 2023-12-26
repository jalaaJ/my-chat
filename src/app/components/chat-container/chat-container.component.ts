import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { IChatRoom, IMessage } from 'src/app/models';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit{

  public rooms$: Observable<Array<IChatRoom>> | undefined;
  public messages$: Observable<Array<IMessage>> | undefined;

  constructor(private chatService: ChatService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      this.rooms$ = this.chatService.getRooms();
      const roomId = this.activatedRoute.snapshot.url[1].path
      this.messages$ = this.chatService.getRoomMessages(roomId);
      this.router.events.pipe(filter(data => data instanceof(NavigationEnd))).subscribe(data => {
        const routerEvent: RouterEvent = <RouterEvent> data;
        const urlArray = routerEvent.url.split("/");
        if(urlArray.length > 2) {
          const updatedRoomId = urlArray[2]
          this.messages$ = this.chatService.getRoomMessages(updatedRoomId);
        }
      })
  }

}
