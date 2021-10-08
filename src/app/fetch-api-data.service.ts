import { Injectable}  from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://bugflixthefirst.herokuapp.com/';

@Injectable({
	providedIn: 'root',
})

export class FetchApiDataService {
	constructor(private http: HttpClient) {}

	/**
	 * This function registers the user.
	 * @param user Username, Password, E-Mail, Birthday, Favorites
	 * @returns Registered user
	 */
	public userRegistration(user: any): Observable<any> {
		return this.http
			.post(apiUrl + 'users', user)
			.pipe(catchError(this.handleError));
	}

	/**
	 * This function logs the user into the application.
	 * @param user Username, Password, E-Mail, Birthday, Favorites
	 * @returns Logged user and token
	 */
	public userLogin(user: any): Observable<any> {
		return this.http
			.post(apiUrl + 'login', user)
			.pipe(catchError(this.handleError));
	}

	/**
	 * This function gets all directors from the API.
	 * @returns All directors
	 */
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

	/**
	 * This function gets all genres from the API.
	 * @returns All genres
	 */
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

	/**
	 * This function gets all movies from the API.
	 * @returns All movies
	 */
	public getMovies(): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
			.get(apiUrl + 'movies', {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	/**
	 * This function gets the user from the API.
	 * @param user Username, Password, E-Mail, Birthday, Favorites
	 * @returns The user
	 */
	public getUser(user: any): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
			.get(apiUrl + `users/${user.Username}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	/**
	 * This function updates the user in the API.
	 * @param user Username, Password, E-Mail, Birthday, Favorites
	 * @returns The updated user
	 */
	public updateUser(user: any): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
			.put(apiUrl + `users/${user.Username}`, user, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	/**
	 * This function deletes the user from the API.
	 * @param user Username, Password, E-Mail, Birthday, Favorites
	 * @returns Success message
	 */
	public deleteUser(user: any): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
			.delete(apiUrl + `users/${user.Username}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
				responseType: 'text' as const
			})
			.pipe(catchError(this.handleError));
	}

	/**
	 * This function adds favourites to the user.
	 * @param user Username, Password, E-Mail, Birthday, Favorites
	 * @param id Movie ID
	 * @returns The updated favourites array
	 */
	public addFavourite(user: any, id: any): Observable<any> {
		const token = localStorage.getItem('token');

		console.log(user.Username, token);

		return this.http
			.post(apiUrl + `users/${user.Username}/favourites/${id}`, id, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	/**
	 * This function removes favourites from the user.
	 * @param user Username, Password, E-Mail, Birthday, Favorites
	 * @param id Movie ID
	 * @returns The updated favourites array
	 */
	public removeFavourite(user: any, id: any): Observable<any> {
		const token = localStorage.getItem('token');
		return this.http
			.delete(apiUrl + `users/${user.Username}/favourites/${id}`, {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	private extractResponseData(response: Response | Object): any {
		return response || {};
	}

	private handleError(error: HttpErrorResponse): any {
		console.log(error);
		if (error.error instanceof ErrorEvent)
			console.error('SOME ERROR OCCURED:', error.error.message);
		else
			console.error(`ERROR STATUS CODE ${error.status}, ` + `ERROR BODY IS: ${error.error}`);
		return throwError('COULD NOT COMPLETE PROCESS, PLEASE TRY AGAIN LATER');
	}
}
