import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.css']
})
export class AuthorViewComponent implements OnInit {
  author: any;
  constructor(private dialogRef: MatDialogRef<AuthorViewComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.author = data;
  }

  ngOnInit(): void {
  }

}
