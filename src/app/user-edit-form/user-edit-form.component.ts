import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-user-edit-form',
	templateUrl: './user-edit-form.component.html',
	styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent implements OnInit {

	/**
	 * Required fields for editing.
	 */
	@Input() user = { Username: '', Password: '', Email: '', Birthday: '' };

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserEditFormComponent>,
		public snackBar: MatSnackBar,
		public router: Router
	) {}

	ngOnInit(): void {}

	/**
	 * This function updates the user.
	 */
	updateUser() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			this.user.Username = user.Username;
			this.fetchApiData.updateUser(this.user).subscribe(
				response => {
					localStorage.setItem('user', JSON.stringify(response));
					this.dialogRef.close();
					this.snackBar.open('Updated Profile!', 'OK', { duration: 2000 });
					window.location.reload();
				},
				response => {
					this.snackBar.open('An Error Occured: ' + response, 'OK', { duration: 2000 });
				}
			);
		}
		else {
			this.snackBar.open('No user found! Please login again!', 'OK', { duration: 2000 });
			this.router.navigate(['welcome']);
		}
		
	}
}
