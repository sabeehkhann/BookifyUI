import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class BookshopService {
  private url = 'https://localhost:44353/api/Bookshop/'

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this,this.httpClient.get(this.url + 'GetAll').pipe(map(res => res));
  }

  createBookshop(resource: any){
    return this.httpClient.post(this.url + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }
}
