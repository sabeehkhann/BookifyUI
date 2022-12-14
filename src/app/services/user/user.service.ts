import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userUrl = 'http://localhost:8080/api/User/'

  constructor(private HttpClient: HttpClient) { 

  }

  getUsers(){
    return this.HttpClient.get(this.userUrl + 'GetAll/').pipe(map(res => res));
  }

  createUser(resource: any){
    return this.HttpClient.post(this.userUrl + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }
}

