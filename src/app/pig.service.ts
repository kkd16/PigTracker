import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigReport } from './pig-report';

@Injectable({
  providedIn: 'root'
})
export class PigService {

  private reportsUrl = 'https://272.selfip.net/apps/wcUnhqEgpi/collections/test6/documents/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getReports(): Observable<PigReport[]> {
    return this.http.get<PigReport[]>(this.reportsUrl, this.httpOptions);
  }

  addReport(report: PigReport): Observable<any> {
    return this.http.post(this.reportsUrl, report, this.httpOptions);
  }

  updateReport(report: PigReport): Observable<any> {
    const url = `${this.reportsUrl}/${report.key}/`;
    return this.http.put(url, report, this.httpOptions);
  }

  getReport(key: string | null): Observable<PigReport> {
    const url = `${this.reportsUrl}/${key}`;
    return this.http.get<PigReport>(url, this.httpOptions);
  }

  deleteReport(key: string | null): Observable<PigReport> {
    const url = `${this.reportsUrl}/${key}/`;
    return this.http.delete<PigReport>(url, this.httpOptions);
  }

}
