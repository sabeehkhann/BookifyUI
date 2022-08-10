import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {
  private url = 'https://localhost:44353/api/BookCategory/'

  constructor(private httpClient: HttpClient) { }

  createBookCategory(resource: any){
    return this.httpClient.post(this.url + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  getCategoriesByBookId(bookId: string | null){
    return this.httpClient.get(this.url + 'GetCategoriesByBookId/' + bookId, { 'headers': headers }).pipe(map(res => res));
  }

}
