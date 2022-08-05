import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'https://localhost:44353/api/Category/'

  constructor(private httpClient: HttpClient) { }

  getAllCategories(){
    return this.httpClient.get(this.url + 'GetAll').pipe(map(res=> res));
  }

  createCategory(resource: any){
    return this.httpClient.post(this.url + 'Post/', resource, { 'headers': headers }).pipe(map(res => res));
  }

  getCategoryById(id: string){
    return this.httpClient.get(this.url + 'Get/' + id, { 'headers': headers }).pipe(map(res => res));
  }

  getBookCategoriesNames(id: string){
    return this.httpClient.get(this.url + 'GetBookCategoriesNames/' + id, { 'headers': headers }).pipe(map(res => res));
  }

}
