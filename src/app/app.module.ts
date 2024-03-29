import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AboutComponent } from './about/about.component';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StandardNavbarComponent } from './standard-navbar/standard-navbar.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersTableComponent } from './admin-panel/users-table/users-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeactivateUserConfirmationDialogComponent } from './admin-panel/deactivate-user-confirmation-dialog/deactivate-user-confirmation-dialog.component';
import { ActivateUserConfirmationDialogComponent } from './admin-panel/activate-user-confirmation-dialog/activate-user-confirmation-dialog.component';
import { UserRejectionDialogComponent } from './admin-panel/user-rejection-dialog/user-rejection-dialog.component';
import { RegistrationRequestsTableComponent } from './admin-panel/registration-requests-table/registration-requests-table.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { JwtInterceptor } from '../interceptors/jwt/jwt.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditProfileDialogComponent } from './about/edit-profile-dialog/edit-profile-dialog.component';
import { SearchColleaguesComponent } from './search-colleagues/search-colleagues.component';
import { PostCardComponent } from './newsfeed/post-card/post-card.component';
import { CommentComponent } from './newsfeed/comment/comment.component';
import { ViewPostDialogComponent } from './newsfeed/view-post-dialog/view-post-dialog.component';
import { ImageDialogComponent } from './newsfeed/image-dialog/image-dialog.component';
import { AuthUserCommentComponent } from './newsfeed/auth-user-comment/auth-user-comment.component';
import { ViewLikesDialogComponent } from './newsfeed/view-likes-dialog/view-likes-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PostSkeletonComponent } from './newsfeed/post-skeleton/post-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AboutComponent,
    NavbarComponent,
    StandardNavbarComponent,
    AdminPanelComponent,
    UsersTableComponent,
    DeactivateUserConfirmationDialogComponent,
    ActivateUserConfirmationDialogComponent,
    UserRejectionDialogComponent,
    RegistrationRequestsTableComponent,
    NewsfeedComponent,
    EditProfileDialogComponent,
    SearchColleaguesComponent,
    PostCardComponent,
    CommentComponent,
    ViewPostDialogComponent,
    ImageDialogComponent,
    AuthUserCommentComponent,
    ViewLikesDialogComponent,
    PostSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatMenuModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatButtonToggleModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
