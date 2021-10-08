import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-login-form',
	templateUrl: './user-login-form.component.html',
	styleUrls: ['./user-login-form.component.scss'],
})

export class UserLoginFormComponent implements OnInit {

	/**
	 * Required fields for login.
	 */
	@Input() user = { Username: '', Password: '' };

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserLoginFormComponent>,
		public snackBar: MatSnackBar,
		public router: Router
	) {}

	ngOnInit(): void {}

	/**
	 * This function handles the login and stores the data in the local storage. 
	 */
	loginUser(): void {
		this.fetchApiData.userLogin(this.user).subscribe(
			response => {
				localStorage.setItem('user', JSON.stringify(response.user));
      			localStorage.setItem('token', response.token);
				this.dialogRef.close();
				this.snackBar.open('Login successful!', 'OK', { duration: 2000 });
				this.router.navigate(['movies']);
			},
			response => {
				this.snackBar.open('An Error Occured: ' + response, 'OK', { duration: 2000 });
			}
		);
	}
}
