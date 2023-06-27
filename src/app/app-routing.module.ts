import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AuthGuard } from '../guards/auth.guard';
import { NoAuthGuard } from '../guards/no-auth.guard';
import { AdminRoleGuard } from '../guards/admin-role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  { path: 'about/:id', component: AboutComponent, canActivate: [AuthGuard] },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AdminRoleGuard],
  },
  { path: '', component: NewsfeedComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
