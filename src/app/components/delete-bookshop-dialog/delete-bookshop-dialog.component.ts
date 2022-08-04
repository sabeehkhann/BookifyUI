import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { BookshopService } from 'src/app/services/bookshop/bookshop.service';

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-delete-bookshop-dialog',
  templateUrl: './delete-bookshop-dialog.component.html',
  styleUrls: ['./delete-bookshop-dialog.component.css']
})
export class DeleteBookshopDialogComponent implements OnInit {
  bookshop: any;

  constructor(public dialogRef: MatDialogRef<DeleteBookshopDialogComponent>,private router: Router, private _snackBar: MatSnackBar,  private bookshopService: BookshopService, @Inject(MAT_DIALOG_DATA) data: any) {
    this.bookshop = data;
   }

  ngOnInit(): void {
  }

  deleteBookshop(){
    this.bookshopService.deleteBookshop(this.bookshop.id)
    .subscribe({
      next: (res: any) => {
        this.bookshop = res;
      },
      complete: () => {
        this._snackBar.open(this.bookshop.name + ' deleted successfully!', 'Done', {
          duration: 3000
        });

        this.dialogRef.close({event:'Yes'});
      }
    })
  }

}
