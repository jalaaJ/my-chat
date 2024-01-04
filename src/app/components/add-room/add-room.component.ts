import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {

  constructor(public dialogRef: MatDialogRef<AddRoomComponent>) {}

  closeModal() {
    this.dialogRef.close();
  }
}
