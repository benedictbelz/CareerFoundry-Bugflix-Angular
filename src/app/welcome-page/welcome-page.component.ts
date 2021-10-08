import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		public router: Router,	
	) {}
	
	ngOnInit(): void {
		this.checkUser();
	}

	/**
	 * This function checks if the user is already logged in.
	 */
	checkUser() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			this.snackBar.open('Login successful!', 'OK', { duration: 2000 });
			this.router.navigate(['movies']);
		}
	}
	
	/**
	 * This function opens the registration dialog.
	 */
	openUserRegistrationDialog(): void {
		this.dialog.open(UserRegistrationFormComponent, { width: '400px' });
	}
	
	/**
	 * This function opens the login dialog.
	 */
	openUserLoginDialog(): void {
		this.dialog.open(UserLoginFormComponent, { width: '400px' });
	}
}
