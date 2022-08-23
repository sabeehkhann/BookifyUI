import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:8080/api/User/'

  username?: string;

  constructor(private HttpClient: HttpClient) { }

  login(username: string | null, password: string | null){
    return this.HttpClient.post(this.userUrl + 'Login/'+ username + '/' + password, null, { 'headers': headers }).pipe(map(res => res));
  }

  logout(){
    localStorage.clear();
  }

  isLoggedIn(){
    let user = localStorage.getItem('User');
    if(user == null){
      return false;
    }
    return true;
  }

  
}
