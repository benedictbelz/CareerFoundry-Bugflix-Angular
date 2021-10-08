import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
	user: any;

	constructor(
		public fetchApiData: FetchApiDataService,
		public snackBar: MatSnackBar,
		public dialog: MatDialog,
		public router: Router
	) {}

	ngOnInit(): void {
		this.getUser();
	}

	/**
	 * This function tries to get the user from the local storage.
	 */
	getUser(): void {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user)
			this.user = user;
		else {
			this.snackBar.open('No user found! Please login again!', 'OK', { duration: 2000 });
			this.router.navigate(['welcome']);
		}
	}

	/**
	 * This function opens the edit dialog.
	 */
	openUserEditDialog(): void {
		this.dialog.open(UserEditFormComponent, { width: '400px' });
	}

	/**
	 * This function deletes the user from the API and goes back to the welcome page.
	 */
	deleteProfile(): void {
		if (confirm('Are you sure?')) {
			this.fetchApiData.deleteUser(this.user).subscribe(response => {
				localStorage.clear();
				this.router.navigate(['welcome']);
				this.snackBar.open('Account Deleted', 'OK', {
					duration: 3000,
				});
			});
		}
	}
}
