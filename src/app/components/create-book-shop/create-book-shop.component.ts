import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-book-shop',
  templateUrl: './create-book-shop.component.html',
  styleUrls: ['./create-book-shop.component.css']
})
export class CreateBookShopComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  formGroup = this._formBuilder.group({
    name: ['', Validators.required],
    address: ['', Validators.required]
  })

  ngOnInit(): void {
  }

}
