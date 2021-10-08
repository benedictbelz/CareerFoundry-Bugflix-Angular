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

	public userRegistration(user: any): Observable<any> {
		return this.http
			.post(apiUrl + 'users', user)
			.pipe(catchError(this.handleError));
	}

	public userLogin(user: any): Observable<any> {
		return this.http
			.post(apiUrl + 'login', user)
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
		const token = localStorage.getItem('token');
		return this.http
			.get(apiUrl + 'movies', {
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

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
