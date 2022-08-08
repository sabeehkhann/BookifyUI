import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookBookshopService } from 'src/app/services/book-bookshop/book-bookshop.service';
import { BookService } from 'src/app/services/book/book.service';
import { forkJoin } from 'rxjs';
import { BookBookshop } from 'src/app/models/BookBookshop';
import { NgForm } from '@angular/forms';

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
  selector: 'app-add-stock-dialog',
  templateUrl: './add-stock-dialog.component.html',
  styleUrls: ['./add-stock-dialog.component.css']
})
export class AddStockDialogComponent implements OnInit {
  stockValue: any;
  selectListValue: any;
  bookBookshop: BookBookshop | any;
  bookshop: any;
  BooksSelectList: any;
  bookshopData: any;
  bookshopTitle: any;
  constructor(private bookBookshopService: BookBookshopService, private bookService: BookService, public dialogRef: MatDialogRef<AddStockDialogComponent>, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data: any) {
    this.bookshop = data;
    this.bookshopTitle = data.name;
  }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('User')!);

    forkJoin({
      requestOne: this.bookService.getAllBooksForBookshop(this.bookshop.id, user.id),
      requestTwo: this.bookBookshopService.getAllBookshopDetail(this.bookshop.id),
    })
      .subscribe(({ requestOne, requestTwo }) => {
        this.BooksSelectList = requestOne;
        this.bookshopData = requestTwo;
        console.log(this.bookshopData);
      });
  }

  addBook(ngForm: NgForm, id: any) {
    this.bookBookshop = {
      bookId: id,
      BookshopId: this.bookshop.id,
      stock: this.stockValue,
    }

    this.bookBookshopService.createBookBookshop(this.bookBookshop)
      .subscribe({
        next: (res: any) => {
          this._snackBar.open('Book Added', 'Done', {
            duration: 3000
          })
          // ngForm.reset();
          this.stockValue = '';
          this.ngOnInit();
        }
      })
  }

  editStock(bookId: any, stock: any) {
    if (stock != 0) {
      this.bookBookshop = {
        bookId: bookId,
        BookshopId: this.bookshop.id,
        stock: stock,
      }

      this.bookBookshopService.updateBookBookshop(this.bookBookshop)
        .subscribe({
          next: (res: any) => {
            this._snackBar.open('Stock Updated', 'Done', {
              duration: 3000
            })
          }
        })
    }
    else{
      this.bookBookshopService.deleteBookBookshop(bookId)
        .subscribe({
          next: (res: any) => {
            this._snackBar.open('Book Removed', 'Done', {
              duration: 3000
            });
          this.ngOnInit();
          }
        })
    }
  }
}
