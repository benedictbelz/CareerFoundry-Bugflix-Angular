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
export class UserRegistrationService {
	constructor(private http: HttpClient) {}

	public userRegistration(userDetails: any): Observable<any> {
		return this.http
			.post(apiUrl + 'users', userDetails)
			.pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent)
			console.error('SOME ERROR OCCURED:', error.error.message);
		else
			console.error(`ERROR STATUS CODE ${error.status}, ` + `ERROR BODY IS: ${error.error}`);
		return throwError('COULD NOT COMPLETE REGISTRATION PROCESS, PLEASE TRY AGAIN LATER');
	}
}

export class UserLoginService {
	constructor(private http: HttpClient) {}

	public userLogin(userDetails: any): Observable<any> {
		return this.http
			.post(apiUrl + 'login', userDetails)
			.pipe(catchError(this.handleError));
	}
	
	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent)
			console.error('SOME ERROR OCCURED:', error.error.message);
		else
			console.error(`ERROR STATUS CODE ${error.status}, ` + `ERROR BODY IS: ${error.error}`);
		return throwError('COULD NOT LOGIN, PLEASE TRY AGAIN LATER');
	}
}

export class GetDirectorsService {
	constructor(private http: HttpClient) {}

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

	private extractResponseData(res: Response | Object): any {
		return res || {};
	}

	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent)
			console.error('SOME ERROR OCCURED:', error.error.message);
		else
			console.error(`ERROR STATUS CODE ${error.status}, ` + `ERROR BODY IS: ${error.error}`);
		return throwError('COULD NOT LOAD DIRECTORS, PLEASE TRY AGAIN LATER');
	}
}

export class GetGenresService {
	constructor(private http: HttpClient) {}

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

	private extractResponseData(res: Response | Object): any {
		return res || {};
	}

	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent)
			console.error('SOME ERROR OCCURED:', error.error.message);
		else
			console.error(`ERROR STATUS CODE ${error.status}, ` + `ERROR BODY IS: ${error.error}`);
		return throwError('COULD NOT LOAD GENRES, PLEASE TRY AGAIN LATER');
	}
}

export class GetMoviesService {
	constructor(private http: HttpClient) {}

	public getMovies(): Observable<any> {
		return this.http
			.get(apiUrl + 'movies', {
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
		return throwError('COULD NOT LOAD MOVIES, PLEASE TRY AGAIN LATER');
	}
}

/*
 * PROBABLY NOT NEEDED
 */
export class GetMovieService {
	constructor(private http: HttpClient) {}

	public getMovie(movie: any): Observable<any> {
		return this.http
			.get(apiUrl + `movies/${movie}`, {
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
		return throwError('COULD NOT LOAD MOVIE, PLEASE TRY AGAIN LATER');
	}
}

/*
 * PROBABLY NOT NEEDED
 */
export class GetUserService {
	constructor(private http: HttpClient) {}

	public getUser(): Observable<any> {
		return this.http
			.get(apiUrl + `users/${user}`, {
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
		return throwError('COULD NOT GET USER, PLEASE TRY AGAIN LATER');
	}
}

export class UpdateUserService {
	constructor(private http: HttpClient) {}

	public updateUser(userDetails: any): Observable<any> {
		return this.http
			.put(apiUrl + `users/${user}`, userDetails, {
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
		return throwError('COULD NOT UPDATE USER, PLEASE TRY AGAIN LATER');
	}
}

export class DeleteUserService {
	constructor(private http: HttpClient) {}

	public deleteUser(): Observable<any> {
		return this.http
			.delete(apiUrl + `users/${user}`, {
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
		return throwError('COULD NOT DELETE USER, PLEASE TRY AGAIN LATER');
	}
}

/*
 * PROBABLY NOT NEEDED
 */
export class GetFavouritesService {
	constructor(private http: HttpClient) {}

	public getFavourites(): Observable<any> {
		return this.http
			.post(apiUrl + `users/${user}/favourites/`, {
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
		return throwError('COULD NOT ADD FAVOURITE, PLEASE TRY AGAIN LATER');
	}
}

export class AddFavouriteService {
	constructor(private http: HttpClient) {}

	public addFavourite(movie: any): Observable<any> {
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
		return throwError('COULD NOT ADD FAVOURITE, PLEASE TRY AGAIN LATER');
	}
}

export class RemoveFavouriteService {
	constructor(private http: HttpClient) {}

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
		return throwError('COULD NOT REMOVE FAVOURITE, PLEASE TRY AGAIN LATER');
	}
}
