import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	constructor(
		public snackBar: MatSnackBar,
		public router: Router
	) {}

	ngOnInit(): void {}

	/**
	 * This function signs the user out and removes all data from local storage.
	 */
	signOut(): void {
		localStorage.clear();
		this.router.navigate(['welcome']);
		this.snackBar.open('Logout successful!', 'OK', { duration: 3000 });
	}
}
