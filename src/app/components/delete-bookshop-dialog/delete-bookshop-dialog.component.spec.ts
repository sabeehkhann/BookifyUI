import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookshopDialogComponent } from './delete-bookshop-dialog.component';

describe('DeleteBookshopDialogComponent', () => {
  let component: DeleteBookshopDialogComponent;
  let fixture: ComponentFixture<DeleteBookshopDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookshopDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBookshopDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
