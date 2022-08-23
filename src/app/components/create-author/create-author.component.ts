import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  author: Author = {
    id: 0,
    name: '',
    createdBy: 0
  }

  pageTitle: string = '';

  constructor(private _snackBar: MatSnackBar, private router: Router, private authorService: AuthorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        var id = params.get('id');
        if(id){
          this.authorService.getById(id)
            .subscribe({
              next: (res: any) => {
                this.author = res;
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

  addAuthor(){
    if (this.author.id == 0 || this.author.id == null) {

      let user: any = JSON.parse(localStorage.getItem('User')!);

      this.author.createdBy = user.id;

      this.authorService.createAuthor(this.author)
        .subscribe({
          next: (res: any) => {
            this._snackBar.open('Author Added', 'Done', {
              duration: 3000
            })
            this.router.navigate(['/authors'])
          },
        })
    }
    else{
      this.authorService.updateAuthor(this.author)
        .subscribe({
          next: (res: any) => {
            this._snackBar.open('Author Updated', 'Done', {
              duration: 3000
            })
            this.router.navigate(['/authors'])
          }
        })
    }
  }

}
