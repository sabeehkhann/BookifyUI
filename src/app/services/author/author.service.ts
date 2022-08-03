import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private url = 'https://localhost:44353/api/Author/'

  constructor(private httpClient: HttpClient) { }

  getAllAuthors(){
    return this.httpClient.get(this.url + 'GetAll').pipe(map(res=> res));
  }

  getAuthrById(id: string){
    return this.httpClient.get(this.url + 'Get/' + id, { 'headers': headers }).pipe(map(res => res));
  }
}
