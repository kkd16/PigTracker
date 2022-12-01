import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url: string = "https://api.hashify.net/hash/md5/hex?value=";


  constructor(private http: HttpClient) { }

  authenticate(key: string | null) {
    const url = `${this.url}${key}`;
    return this.http.get<any>(url);
  }
}
