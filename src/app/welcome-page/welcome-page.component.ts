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

	checkUser() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			this.snackBar.open('Login successful!', 'OK', { duration: 2000 });
			this.router.navigate(['movies']);
		}
	}
	
	openUserRegistrationDialog(): void {
		this.dialog.open(UserRegistrationFormComponent, { width: '400px' });
	}
	
	openUserLoginDialog(): void {
		this.dialog.open(UserLoginFormComponent, { width: '400px' });
	}
}
