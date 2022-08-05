import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/models/Book';
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthorService } from 'src/app/services/author/author.service';
import { BookCategoryService } from 'src/app/services/book-category/book-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';


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

  constructor(private _snackBar: MatSnackBar, private router: Router, private bookService: BookService, private route: ActivatedRoute,private catService: CategoryService, private bookCatService: BookCategoryService, private authorService: AuthorService) { }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('User')!);

    forkJoin({
      requestOne: this.catService.getAllCategories(),
      requestTwo: this.authorService.getAll(user.id),
    })
      .subscribe(({ requestOne, requestTwo }) => {
        this.categories = requestOne;
        this.authors = requestTwo;
      });
      
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
                this.pageTitle = 'Edit ';
              }
            })

            this.bookCatService.getCategoriesByBookId(id)
            .subscribe((res: any) => {
              res.forEach((ele: any) => {
                this.book.category = this.book.category || [];
                this.book.category?.push(ele.categoryId);
              })
            })
        }
        else{
          this.pageTitle = 'Create ';
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
            this._snackBar.open('Book Added', 'Done', {
              duration: 3000
            })
            this.router.navigate(['/books'])
          },
        })
    }
    else {
      this.bookService.updateBook(this.book)
        .subscribe({
          next: (res: any) => {

            this._snackBar.open('Book Updated', 'Done', {
              duration: 3000
            })
            this.router.navigate(['/books'])
          }
        })
    }
  }

  
}

