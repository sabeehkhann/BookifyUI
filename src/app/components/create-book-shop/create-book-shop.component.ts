import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookshop } from 'src/app/models/Bookshop';
import { BookshopService } from 'src/app/services/bookshop/bookshop.service';

@Component({
  selector: 'app-create-book-shop',
  templateUrl: './create-book-shop.component.html',
  styleUrls: ['./create-book-shop.component.css']
})
export class CreateBookShopComponent implements OnInit {

  bookshop: Bookshop = {
    id: 0,
    name: '',
    address: '',
    createdBy: 0
  }

  pageTitle: string = '';

  constructor(private router: Router, private bookshopService: BookshopService, private route: ActivatedRoute, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params) => {
        var id = params.get('id');
        if(id){
          this.pageTitle = 'Edit Bookshop';
        }
        else{
          this.pageTitle = 'Create Bookshop';
        }
      }
    });
  }

  AddBookshop(){
    if (this.bookshop.id == 0 || this.bookshop.id == null) {

      let user: any = JSON.parse(localStorage.getItem('User')!);

      this.bookshop.createdBy = user.id;

      this.bookshopService.createBookshop(this.bookshop)
        .subscribe({
          next: (res: any) => {
            // this.userId = <number>res.id;

            this.router.navigate(['/bookshops'])
          },
        })
    }
    else{
      
    }
  }
}
