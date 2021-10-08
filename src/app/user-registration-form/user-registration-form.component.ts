import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-registration-form',
	templateUrl: './user-registration-form.component.html',
	styleUrls: ['./user-registration-form.component.scss'],
})

export class UserRegistrationFormComponent implements OnInit {
	@Input() user = { Username: '', Password: '', Email: '', Birthday: '' };

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
		public snackBar: MatSnackBar,
		public router: Router
	) {}

	ngOnInit(): void {}

	registerUser(): void {
		this.fetchApiData.userRegistration(this.user).subscribe(
			response => {
				this.fetchApiData.userLogin(this.user).subscribe(
					response => {
						localStorage.setItem('user', JSON.stringify(response.user));
						localStorage.setItem('token', response.token);
						this.snackBar.open('Registration successful!', 'OK', { duration: 2000 });
						this.dialogRef.close();
						this.router.navigate(['movies']);
					},
					response => {
						this.snackBar.open('An Error Occured: ' + response, 'OK', { duration: 2000 });
					}
				);
			},
			response => {
				this.snackBar.open('An Error Occured: ' + response, 'OK', { duration: 2000 });
			}
		);
	}
}
