import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NumberValueAccessor, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/models/Book';
import { ActivatedRoute, Route, Router } from '@angular/router'
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthorService } from 'src/app/services/author/author.service';
import { User } from 'src/app/models/User';
import { Category } from 'src/app/models/Category';
import { BookCategoryService } from 'src/app/services/book-category/book-category.service';
import { mergeMap, switchMap } from 'rxjs';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  book: Book = {
    id: 0,
    name: '',
    isbn: '',
    authorId: 0,
    isActive: false,
    createdBy: 0,
    description: '',
    category: [],
  };

  pageTitle: string = '';
  categories: any;
  authors: any;
  userId?: number;

  constructor(private router: Router, private bookService: BookService, private route: ActivatedRoute,private catService: CategoryService, private bookCatService: BookCategoryService, private authorService: AuthorService) { }

  ngOnInit(): void {
    this.catService.getAllCategories()
    .subscribe({
      next: res => {
        this.categories = res;
      }
    })

  this.authorService.getAllAuthors()
    .subscribe({
      next: res => {
        this.authors = res;
      }
    })

    this.route.paramMap.subscribe({
      next: (params) => {
        var id = params.get('id');
        if(id){
          this.bookService.getBookById(id)
            .subscribe({
              next: (res: any) => {
                this.book = res;
              },
              complete: () => {
                this.pageTitle = 'Edit Book'
              }
            })

            this.bookCatService.getCategoriesByBookId(id)
            .subscribe((res: any) => {
              res.forEach((ele: any) => {
                this.book.category = this.book.category || [];
                this.book.category?.push(ele.categoryId);
              })
            })
            console.log(this.book.category)
        }
        else{
          this.pageTitle = 'Create Book';
        }
      }
    });
  }

  AddBook() {
    if (this.book.id == 0 || this.book.id == null) {

      let user: any = JSON.parse(localStorage.getItem('User')!);

      this.book.createdBy = user.id;

      this.bookService.createBook(this.book)
        .subscribe({
          next: (res: any) => {
            // this.userId = <number>res.id;

            this.router.navigate(['/books'])
          },
        })

        
    }
    else {
      this.bookService.updateBook(this.book)
        .subscribe({
          next: (res: any) => {
            this.router.navigate(['/books'])
          }
        })
    }
  }

  
}

