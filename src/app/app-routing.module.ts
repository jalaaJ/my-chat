import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "chat",
    component: ChatContainerComponent,
    canActivate: [authGuard]
  },
  {
    path: "chat/:roomId",
    component: ChatContainerComponent,
    canActivate: [authGuard]
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
