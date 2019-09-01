import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { TableTooComponent } from './table-too/table-too.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
