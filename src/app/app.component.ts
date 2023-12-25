import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-chat';

  constructor(private authService: AuthService) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

}
