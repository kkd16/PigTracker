import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PigReport } from './pig-report';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PigService {

  private reportsUrl = 'https://272.selfip.net/apps/wcUnhqEgpi/collections/test3/documents/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getReports(): Observable<PigReport[]> {
    return this.http.get<PigReport[]>(this.reportsUrl)
      .pipe(
        tap(_ => this.log('fetched reports')),
        catchError(this.handleError<PigReport[]>('getReports', []))
      );
  }

  addReport(report: PigReport){
    this.http.post(this.reportsUrl, report).subscribe((data:any)=>{
      this.log("Added report: " + report.data.name);
    })
  }

  getReport(key: string | null): Observable<PigReport> {
    const url = `${this.reportsUrl}/${key}`;
    return this.http.get<PigReport>(url).pipe(
      tap(_ => this.log(`fetched report key=${key}`)),
      catchError(this.handleError<PigReport>(`getReport key=${key}`))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.push(`PigService: ${message}`);
  }

}


