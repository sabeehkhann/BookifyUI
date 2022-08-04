import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


@Injectable({
  providedIn: 'root'
})
export class BookBookshopService {
  private url = 'https://localhost:44353/api/BookBookshop/'
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this,this.httpClient.get(this.url + 'GetAll').pipe(map(res => res));
  }

  getAllBookshopDetail(id: string){
    return this,this.httpClient.get(this.url + 'GetAllBookshopDetails/' + id, { 'headers': headers }).pipe(map(res => res));
  }

  createBookBookshop(resource: any){
    return this.httpClient.post(this.url + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  getBookBookshopById(id: string){
    return this.httpClient.get(this.url + 'Get/' + id, { 'headers': headers }).pipe(map(res => res));
  }

  updateBookBookshop(resource: any){
    return this.httpClient.put(this.url + 'Put/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  deleteBookBookshop(id: string){
    return this.httpClient.delete(this.url + 'DeleteByBookId/' + id, { 'headers': headers }).pipe(map(res => res))
  }
}
