import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserConfirmationDialogComponent } from './activate-user-confirmation-dialog.component';

describe('ActivateUserConfirmationDialogComponent', () => {
  let component: ActivateUserConfirmationDialogComponent;
  let fixture: ComponentFixture<ActivateUserConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateUserConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateUserConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
