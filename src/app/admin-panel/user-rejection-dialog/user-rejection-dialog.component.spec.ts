import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRejectionDialogComponent } from './user-rejection-dialog.component';

describe('UserRejectionDialogComponent', () => {
  let component: UserRejectionDialogComponent;
  let fixture: ComponentFixture<UserRejectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRejectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRejectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
