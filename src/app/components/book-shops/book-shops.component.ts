import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface BookshopsData {
  name: string;
  address: string;
}

@Component({
  selector: 'app-book-shops',
  templateUrl: './book-shops.component.html',
  styleUrls: ['./book-shops.component.css']
})
export class BookShopsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address'];
  dataSource: MatTableDataSource<BookshopsData>;

  @ViewChild(MatPaginator) paginator?: MatPaginator | any;
  @ViewChild(MatSort) sort?: MatSort | any;

  constructor() {
    let bookshops: BookshopsData[] = [
      {
        name: 'test1',
        address: 'test Address' 
      },
      {
        name: 'test2',
        address: 'test Address'
      }
    ]
    this.dataSource = new MatTableDataSource(bookshops);
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
