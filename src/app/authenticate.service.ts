import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url: string = "https://api.hashify.net/hash/md5/hex?value=";
  correct_password: string = "84892b91ef3bf9d216bbc6e88d74a77c"
  provided_password: any;

  constructor(private http: HttpClient) { }

  authenticate(key: string | null): boolean {
    // let hash: any;
    // const url = `${this.url}${key}`;
    // this.http.get<string>(url).subscribe(e => hash = e);

    // console.log(url);
    // console.log(hash);
    // return hash === this.correct_password;

    // const url = `${this.url}${key}`;
    // this.http.get<Object>(url)
    //   .subscribe((data: any) => {
    //     this.provided_password = data;
    //     console.log(this.provided_password.Digest === this.correct_password);
    //     console.log(this.provided_password.Digest);
    //   })

    // while(this.provided_password === undefined) {
    //   console.log("await");
    // }


    // // const t = this.http.get<Object>(url).toPromise()
    // console.log( this.provided_password.Digest === this.correct_password);
    // return this.provided_password.Digest === this.correct_password;
    return key === "OINK!!";
  }
}
