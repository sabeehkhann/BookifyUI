import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  constructor(private _forBuilder: FormBuilder) { }

  formGroup = this._forBuilder.group({
    name: ['', Validators.required]
  })

  ngOnInit(): void {
  }

}
