import { Injectable}  from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://bugflixthefirst.herokuapp.com/';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

@Injectable({
	providedIn: 'root',
})

export class FetchApiDataService {
	constructor(private http: HttpClient) {}

	public userRegistration(userDetails: any): Observable<any> {
		return this.http
			.post(apiUrl + 'users', userDetails)
			.pipe(catchError(this.handleError));
	}

	public userLogin(userDetails: any): Observable<any> {
		return this.http
			.post(apiUrl + 'login', userDetails)
			.pipe(catchError(this.handleError));
	}

	public getDirectors(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
			.get(apiUrl + 'directors', {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	public getGenres(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
			.get(apiUrl + 'genres', {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	public getMovies(): Observable<any> {
		return this.http
			.get(apiUrl + 'movies', {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	/* public getMovie(movie: any): Observable<any> {
		return this.http
			.get(apiUrl + `movies/${movie}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	} */

	/* public getUser(): Observable<any> {
		return this.http
			.get(apiUrl + `users/${user}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	} */

	public updateUser(userDetails: any): Observable<any> {
		return this.http
			.put(apiUrl + `users/${user}`, userDetails, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	public deleteUser(): Observable<any> {
		return this.http
			.delete(apiUrl + `users/${user}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	/* public getFavourites(): Observable<any> {
		return this.http
			.post(apiUrl + `users/${user}/favourites/`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	} */

	public addFavourite(movie: any): Observable<any> {
		return this.http
			.post(apiUrl + `users/${user}/favourites/${movie}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	public removeFavourite(movie: any): Observable<any> {
		return this.http
			.post(apiUrl + `users/${user}/favourites/${movie}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	private extractResponseData(res: Response | Object): any {
		return res || {};
	}

	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent)
			console.error('SOME ERROR OCCURED:', error.error.message);
		else
			console.error(`ERROR STATUS CODE ${error.status}, ` + `ERROR BODY IS: ${error.error}`);
		return throwError('COULD NOT COMPLETE REGISTRATION PROCESS, PLEASE TRY AGAIN LATER');
	}
}
