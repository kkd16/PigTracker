import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigReport } from './pig-report';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PigService {

  private reportsUrl = 'https://272.selfip.net/apps/wcUnhqEgpi/collections/test4/documents/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getReports(): Observable<PigReport[]> {
    return this.http.get<PigReport[]>(this.reportsUrl, this.httpOptions);
  }

  addReport(report: PigReport){
    this.http.post(this.reportsUrl, report).subscribe(()=>{
      this.messageService.push("Added report: " + report.data.name);
    })
  }

  getReport(key: string | null): Observable<PigReport> {
    const url = `${this.reportsUrl}/${key}`;
    return this.http.get<PigReport>(url, this.httpOptions);
  }

  deleteReport(key: string | null): Observable<PigReport> {
    const url = `${this.reportsUrl}/${key}`;
    return this.http.delete<PigReport>(url, this.httpOptions);
  }

}
