import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bookshop-view',
  templateUrl: './bookshop-view.component.html',
  styleUrls: ['./bookshop-view.component.css']
})
export class BookshopViewComponent implements OnInit {

  bookshop: any;
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.bookshop = data;
   }

  ngOnInit(): void {
  }

  checkBooks(){ 
    if(this.bookshop.books.length > 0){
      return true;
    }
    return false;
  }
}
