import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private _snackBar: MatSnackBar, private router: Router, private bookshopService: BookshopService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        var id = params.get('id');
        if(id){
          this.bookshopService.getById(id)
            .subscribe({
              next: (res: any) => {
                this.bookshop = res;
              },
              complete: () => {
                this.pageTitle = 'Edit '
              }
            })
        }
        else{
          this.pageTitle = 'Create ';
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
            this._snackBar.open('Bookshop Added', 'Done', {
              duration: 3000
            })
            this.router.navigate(['/bookshops'])
          },
        })
    }
    else{
      this.bookshopService.updateBookshop(this.bookshop)
        .subscribe({
          next: (res: any) => {

            this._snackBar.open('Bookshop Updated', 'Done', {
              duration: 3000
            })
            this.router.navigate(['/bookshops'])
          }
        })
    }
  }
}
