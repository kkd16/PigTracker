import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PigLocation } from './pig-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationsUrl = 'https://272.selfip.net/apps/wcUnhqEgpi/collections/location6/documents/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getLocations(): Observable<PigLocation[]> {
    return this.http.get<PigLocation[]>(this.locationsUrl, this.httpOptions);
  }

  addLocation(location: PigLocation){
    this.http.post(this.locationsUrl, location, this.httpOptions).subscribe(()=>{
    })
  }

  updateLocation(location: PigLocation): Observable<any> {
    const url = `${this.locationsUrl}/${location.key}/`;
    return this.http.put(url, location, this.httpOptions);
  }

  getLocation(key: string | null): Observable<PigLocation> {
    const url = `${this.locationsUrl}/${key}/`;
    return this.http.get<PigLocation>(url, this.httpOptions);
  }
}
