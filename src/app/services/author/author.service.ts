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

  getAll(id: string){
    return this.httpClient.get(this.url + 'GetAllForUser/' + id).pipe(map(res=> res));
  }

  getById(id: string){
    return this.httpClient.get(this.url + 'Get/' + id, { 'headers': headers }).pipe(map(res => res));
  }

  createAuthor(resource: any){
    return this.httpClient.post(this.url + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  updateAuthor(resource: any){
    return this.httpClient.put(this.url + 'Put/', resource, { 'headers': headers }).pipe(map(res => res));
  }
  
  deleteAuthor(id: string){
    return this.httpClient.delete(this.url + 'DeleteById/' + id, { 'headers': headers }).pipe(map(res => res))
  }
}
