import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author/author.service';
import { BookService } from 'src/app/services/book/book.service';
import { AuthorViewComponent } from '../author-view/author-view.component';
import { DeleteAuthorDialogComponent } from '../delete-author-dialog/delete-author-dialog.component';

export interface AuthorsData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  allAuthors: AuthorsData[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<AuthorsData> | any;

  @ViewChild(MatPaginator) paginator?: MatPaginator | any;
  @ViewChild(MatSort) sort?: MatSort | any;

  constructor(private bookService: BookService, private dialog: MatDialog, private authorService: AuthorService) {

  }
  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('User')!);
    this.authorService.getAll(user.id)
      .subscribe((res: any) => {
        res.forEach((element: any) => {
          let author: AuthorsData = {
            id: element.id,
            name: element.name,
          };
          this.allAuthors?.push(author);
        });
        this.dataSource = new MatTableDataSource(this.allAuthors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openViewDialog(id: string) {
    let author: any;
    let books: any;
    forkJoin({
      authorRes: this.authorService.getById(id),
      booksRes: this.bookService.getAllBooksForAuthor(id)
    })
    .subscribe(({ authorRes, booksRes }) => {
      author = authorRes;
      books = booksRes;
      
      author.books = books
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = author;

      this.dialog.open(AuthorViewComponent, dialogConfig);
    });

    // this.authorService.getById(id)
    //   .subscribe({
    //     next: (res: any) => {
    //       author = res;
    //     },
    //     complete: () => {
    //       const dialogConfig = new MatDialogConfig();
    //       dialogConfig.data = author;

    //       this.dialog.open(AuthorViewComponent, dialogConfig);
    //     }
    //   })
  }

  openDeleteDialog(id: string){
    let author: any;
    this.authorService.getById(id)
      .subscribe({
        next: (res: any) => {
          author = res;

          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = author;

          let dialogRef = this.dialog.open(DeleteAuthorDialogComponent, dialogConfig);

          dialogRef.afterClosed().subscribe((result) =>{
            if(result.event == 'Yes'){
              this.deleteRowData(author.id);
            }
          });
        },
        complete: () => {
          
        }
      })
  }

  deleteRowData(id: any){
    this.dataSource = this.dataSource.data.filter((value: any) =>{
      console.log(id, value.id);
      return value.id != id;
    });
  }
}
