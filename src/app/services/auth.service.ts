import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) {

  }

  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            //guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, user.name);
          }
        })
      );
  }

  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            //guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, user.email);
          }
        })
      );
  }




  logout() {
    //se borra el token
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("USER")
  }

  existsToken(): boolean {
    return !!(localStorage.getItem("ACCESS_TOKEN") && localStorage.getItem("USER"))
  }

  private saveToken(token: string, expiresIn: string, user: string): void {

    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("USER", user);
    this.token = token;
  }

  private getToken(): string {
    //si no hay token se pilla del localStorage
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")
    }
    return this.token;
  }

}
