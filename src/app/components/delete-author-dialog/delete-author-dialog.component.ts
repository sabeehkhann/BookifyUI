import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorService } from 'src/app/services/author/author.service';

@Component({
  selector: 'app-delete-author-dialog',
  templateUrl: './delete-author-dialog.component.html',
  styleUrls: ['./delete-author-dialog.component.css']
})
export class DeleteAuthorDialogComponent implements OnInit {

  author: any;
  constructor(public dialogRef: MatDialogRef<DeleteAuthorDialogComponent>, private _snackBar: MatSnackBar,  private authorService: AuthorService, @Inject(MAT_DIALOG_DATA) data: any) { 
    this.author = data;
  }

  ngOnInit(): void {
  }

  deleteAuthor(){
    this.authorService.deleteAuthor(this.author.id)
    .subscribe({
      next: (res: any) => {
        if(res != null){
          this.author = res;
          this._snackBar.open(this.author.name + ' deleted successfully!', 'Done', {
            duration: 3000
          });

          this.dialogRef.close({event:'Yes'});
        }
        else{
          this._snackBar.open('Cannot delete author assigned to a book', 'Done', {
            duration: 3000
          });
        }
      },
      complete: () => {
        
      }
    })
  }
}
