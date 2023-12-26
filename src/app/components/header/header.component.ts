import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  // isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.isLoggedIn().subscribe(userState => {
        this.isLoggedIn = userState;
      });
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  signout(): void {
    this.authService.signout();
  }

}
