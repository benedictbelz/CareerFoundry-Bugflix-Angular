import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
	user: any;
	movies: any[] = [];

	constructor(
		public fetchApiData: FetchApiDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		public router: Router
	) {}

	ngOnInit(): void {
		this.getMovies();
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
	 * This function gets the movie according to its id and add it to the favourites list.
	 * @param id Movie ID
	 */
	addFavourite(id: number) {
		const index = this.movies.findIndex(movie => movie._id === id);
		if (index !== -1) {
			this.fetchApiData.addFavourite(this.user, id).subscribe((res: any) => {
				this.movies[index].Favourite = true;
				this.snackBar.open(`${this.movies[index].Title} has been added to favourites`, 'OK', { duration: 3000 })
			})
		}
	}

	/**
	 * This function gets the movie according to its id and removes it from the favourites list.
	 * @param id Movie ID
	 */
	removeFavourite(id: number) {
		const index = this.movies.findIndex(movie => movie._id === id);
		if (index !== -1) {
			this.fetchApiData.removeFavourite(this.user, id).subscribe((res: any) => {
				this.movies[index].Favourite = false;
				this.snackBar.open(`${this.movies[index].Title} has been removed from favourites`, 'OK', { duration: 3000 })
			})
		}
	}

	/**
	 * This function opens the director dialog and passes the parameters.
	 * @param Name Director Name
	 * @param Bio Director Bio
	 * @param Birth Director Birth
	 */
	openDirectorDialog(Name: string, Bio: string, Birth: string): void {
		this.dialog.open(MovieDirectorComponent, {
			data: { Name, Bio, Birth },
			width: '650px',
		});
	}

	/**
	 * This function opens the genre dialog and passes the parameters.
	 * @param Name Genre Name
	 * @param Description Genre Description
	 */
	openGenreDialog(Name: string, Description: string) {
		this.dialog.open(MovieGenreComponent, {
			data: { Name, Description },
			width: '650px',
		});
	}

	/**
	 * This function opens the synopsis dialog and passes the parameters.
	 * @param Description Synopsis Description
	 */
	openSynopsis(Description: string) {
		this.dialog.open(MovieSynopsisComponent, {
			data: { Description },
			width: '650px',
		});
	}

	/**
	 * This function gets all directors, genres, movies and favourites and merges them together.
	 */
	getMovies(): void {
		// DEFINE VARIABLES
		let favourites: any;
		let directors: any;
		let genres: any;
		let movies: any;
		// GET FAVOURITES
		const user = JSON.parse(localStorage.getItem('user'));
		if (user)
			favourites = user.Favorites
		else {
			this.snackBar.open('No user found! Please login again!', 'OK', { duration: 2000 });
			this.router.navigate(['welcome']);
		}
		// GET MOVIES
		this.fetchApiData.getMovies().subscribe((response: any) => {
			movies = response;
			// GET GENRES
			this.fetchApiData.getGenres().subscribe((response: any) => {
				genres = response;
				// GET DIRECTORS
				this.fetchApiData.getDirectors().subscribe((response: any) => {
					directors = response;
					// UPDATE DIRECTOR AND GENRE OF EACH MOVIE
					movies.forEach((movie) => {
						const director = movie.Director;
						const genre = movie.Genre;
						movie.Director = directors.filter(item => item._id === director)[0];
						movie.Genre = genres.filter(item => item._id === genre)[0];
						if (favourites.includes(movie._id))
							movie.Favourite = true;
						else
							movie.Favourite = false;
					});
					// UPDATE MOVIES
					this.movies = movies;
					console.log(favourites);
					console.log(movies);
				});
			});
		});
	}
}
