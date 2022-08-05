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

  getAll(id: string){
    return this,this.httpClient.get(this.url + 'GetAllForUser/' + id).pipe(map(res => res));
  }

  createBookshop(resource: any){
    return this.httpClient.post(this.url + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  getById(id: string){
    return this.httpClient.get(this.url + 'Get/' + id, { 'headers': headers }).pipe(map(res => res));
  }

  updateBookshop(resource: any){
    return this.httpClient.put(this.url + 'Put/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  deleteBookshop(id: string){
    return this.httpClient.delete(this.url + 'Delete/' + id, { 'headers': headers }).pipe(map(res => res))
  }
}
