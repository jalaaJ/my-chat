import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IChatRoom } from 'src/app/models';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit{

  public rooms$: Observable<Array<IChatRoom>> | undefined;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
      this.rooms$ = this.chatService.getRooms();
  }

}
