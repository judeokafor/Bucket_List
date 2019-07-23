import { NgModule } from '@angular/core';
import { CanActivate, Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';

import { 
  AuthGuard 
} from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent, 
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'list/:id',
    component: ListItemComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  })
export class AppRoutingModule {}
