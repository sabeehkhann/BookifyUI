import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorService } from 'src/app/services/author/author.service';
import { BookService } from 'src/app/services/book/book.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { BookViewComponent } from '../book-view/book-view.component';
import { DeleteBookDialogComponent } from '../delete-book-dialog/delete-book-dialog.component';


export interface BookData {
  id: number;
  name: string;
  isbn: string;
  isActive: string;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  allBooks: BookData[] = [];
  displayedColumns: string[] = ['name', 'isbn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<BookData> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator?: MatPaginator | any;
  @ViewChild(MatSort) sort?: MatSort | any;

  constructor(private bookService: BookService, private dialog: MatDialog, private authorService: AuthorService, private catService: CategoryService) {

  }

  ngOnInit() {
    let user: any = JSON.parse(localStorage.getItem('User')!);
    this.bookService.getAllForUser(user.id)
      .subscribe((res: any) => {
        res.forEach((element: any) => {
          let book: BookData = {
            id: element.id,
            name: element.name,
            isbn: element.isbn,
            isActive: element.isActive
          };
          this.allBooks?.push(book);
        });

        this.dataSource.data = this.allBooks;
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
    let book: any;
    let categories: string[];

    this.bookService.getBookById(id)
      .subscribe({
        next: (res) => {
          book = {
            ...res,
          }
        },
        complete: () => {
          this.authorService.getById(book.authorId)
            .subscribe({
              next: (res: any) => {
                res.authorName = res.name;
                delete res.name;
                Object.assign(book, res);
              },
              complete: () => {
                this.catService.getBookCategoriesNames(id)
                  .subscribe({
                    next: (res: any) => {
                      categories = res;
                    },
                    complete: () => {
                      book.categories = categories;
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = book;

                      this.dialog.open(BookViewComponent, dialogConfig);


                    }
                  })
              }
            })
        }
      })
  }

  openDeleteDialog(id: any) {
    let book: any;
    this.bookService.getBookById(id)
      .subscribe({
        next: (res: any) => {
          book = res;
        },
        complete: () => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = book;

          let dialogRef = this.dialog.open(DeleteBookDialogComponent, dialogConfig);

          dialogRef.afterClosed().subscribe((result) =>{
            if(result.event == 'Yes'){
              this.deleteRowData(book.id);
            }
          });
        }
      })
  }

  deleteRowData(id: any){
    this.dataSource.data = this.dataSource.data.filter((value: BookData) =>{
      return value.id != id;
    });
  }
}




