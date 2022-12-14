import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = 'http://localhost:8080/api/Book/'

  constructor(private httpClient: HttpClient) { }

  getAllForUser(id: string){
    return this,this.httpClient.get(this.url + 'GetAllForUser/'+ id).pipe(map(res => res));
  }

  getAllBooksForBookshop(id: string, createdBy: string){
    return this,this.httpClient.get(this.url + 'GetAllForBookshop/' + id + '/' + createdBy).pipe(map(res => res));
  }

  getAllBooksForAuthor(id: string){
    return this,this.httpClient.get(this.url + 'GetAllForAuthor/' + id ).pipe(map(res => res));
  }

  createBook(resource: any){
    return this.httpClient.post(this.url + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  getBookById(id: string){
    return this.httpClient.get(this.url + 'Get/' + id, { 'headers': headers }).pipe(map(res => res));
  }

  updateBook(resource: any){
    return this.httpClient.put(this.url + 'Put/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  deleteBook(id: string){
    return this.httpClient.delete(this.url + 'Delete/' + id, { 'headers': headers }).pipe(map(res => res))
  }
}
