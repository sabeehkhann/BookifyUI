import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Book } from 'src/app/models/Book';

export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}



@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  
  book: any;
  constructor(private dialogRef: MatDialogRef<BookViewComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.book = data;
   }

  ngOnInit(): void {
    
  }
}
