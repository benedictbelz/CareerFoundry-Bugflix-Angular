import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HeaderComponent } from './header/header.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDirectorComponent } from './movie-director/movie-director.component';
import { MovieGenreComponent } from './movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from './movie-synopsis/movie-synopsis.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserEditFormComponent } from './user-edit-form/user-edit-form.component';

/**
 * Set routes for welcome, movies and profile.
 */
const routes: Routes = [
	{ path: 'welcome', component: WelcomePageComponent },
	{ path: 'movies', component: MovieCardComponent },
	{ path: 'profile', component: ProfilePageComponent },
	{ path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
]

@NgModule({
	declarations: [
		AppComponent,
		UserRegistrationFormComponent,
		UserLoginFormComponent,
		WelcomePageComponent,
		HeaderComponent,
		MovieCardComponent,
		MovieDirectorComponent,
		MovieGenreComponent,
		MovieSynopsisComponent,
		ProfilePageComponent,
		UserEditFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		RouterModule.forRoot(routes),
		MatDialogModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatSnackBarModule,
		MatIconModule,
		MatToolbarModule,
	],
	providers: [],
	bootstrap: [
		AppComponent
	],
})

export class AppModule {}
