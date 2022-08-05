import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { BookBookshopService } from 'src/app/services/book-bookshop/book-bookshop.service';
import { BookshopService } from 'src/app/services/bookshop/bookshop.service';
import { AddStockDialogComponent } from '../add-stock-dialog/add-stock-dialog.component';
import { BookshopViewComponent } from '../bookshop-view/bookshop-view.component';
import { DeleteBookshopDialogComponent } from '../delete-bookshop-dialog/delete-bookshop-dialog.component';

export interface BookshopsData {
  id: number;
  name: string;
  address: string;
}

@Component({
  selector: 'app-book-shops',
  templateUrl: './book-shops.component.html',
  styleUrls: ['./book-shops.component.css']
})
export class BookShopsComponent implements OnInit {
  allBookshops: BookshopsData[] = [];
  displayedColumns: string[] = ['name', 'address', 'actions'];
  dataSource: MatTableDataSource<BookshopsData> | any;

  @ViewChild(MatPaginator) paginator?: MatPaginator | any;
  @ViewChild(MatSort) sort?: MatSort | any;

  constructor(private bookBookshopService: BookBookshopService, private dialog: MatDialog, private bookshopService: BookshopService) {
  }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('User')!);
    this.bookshopService.getAll(user.id)
      .subscribe((res: any) => {
        res.forEach((element: any) => {
          let bookshop: BookshopsData = {
            id: element.id,
            name: element.name,
            address: element.address
          };
          this.allBookshops?.push(bookshop);
        });
        this.dataSource = new MatTableDataSource(this.allBookshops);
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
    let bookshop: any;
    let books: any;
    forkJoin({
      bookshopRes: this.bookshopService.getById(id),
      booksRes: this.bookBookshopService.getAllBookshopDetail(id)
    })
    .subscribe(({ bookshopRes, booksRes }) => {
      bookshop = bookshopRes;
      books = booksRes;
      
      bookshop.books = books;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = bookshop;

      this.dialog.open(BookshopViewComponent, dialogConfig);
    });
  }

  openDeleteDialog(id: any) {
    let bookshop: any;
    this.bookshopService.getById(id)
      .subscribe({
        next: (res: any) => {
          bookshop = res;
        },
        complete: () => {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = bookshop;

          let dialogRef = this.dialog.open(DeleteBookshopDialogComponent, dialogConfig);

          dialogRef.afterClosed().subscribe((result) =>{
            if(result.event == 'Yes'){
              this.deleteRowData(bookshop.id);
            }
          });
        }
      })
  }

  openAddStockDialog(id: any){
    let bookshop: any;
    this.bookshopService.getById(id)
    .subscribe({
      next: (res: any) => {
        bookshop = res;
      },
      complete: () => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = bookshop;

        this.dialog.open(AddStockDialogComponent, dialogConfig);
      }
    })
  }

  deleteRowData(id: any){
    this.dataSource = this.dataSource.data.filter((value: any) =>{
      
      return value.id != id;
    });
  }
}
