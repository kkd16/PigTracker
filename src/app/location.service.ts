import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagesService } from './messages.service';
import { PigLocation } from './pig-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationsUrl = 'https://272.selfip.net/apps/wcUnhqEgpi/collections/location2/documents/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getLocations(): Observable<PigLocation[]> {
    return this.http.get<PigLocation[]>(this.locationsUrl, this.httpOptions);
  }

  addLocation(location: PigLocation){
    this.http.post(this.locationsUrl, location).subscribe(()=>{
      this.messageService.push("Added location: " + location.key);
    })
  }

  getLocation(key: string | null): Observable<PigLocation> {
    const url = `${this.locationsUrl}/${key}`;
    return this.http.get<PigLocation>(url, this.httpOptions);
  }
}
