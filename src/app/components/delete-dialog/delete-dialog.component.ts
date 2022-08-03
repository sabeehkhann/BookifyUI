import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { BooksComponent } from '../books/books.component';

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  book: any;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,private router: Router, private _snackBar: MatSnackBar,  private bookService: BookService, @Inject(MAT_DIALOG_DATA) data: any) {
    this.book = data;
   }

  ngOnInit(): void {
    
  }

  deleteBook(){
    this.bookService.deleteBook(this.book.id)
    .subscribe({
      next: (res: any) => {
        this.book = res;
      },
      complete: () => {
        this._snackBar.open(this.book.name + ' deleted successfully!', 'Done', {
          duration: 3000
        });

        this.dialogRef.close({event:'Yes'});
        
        this.router.navigate(['/books']);
      }
    })
  }

}
