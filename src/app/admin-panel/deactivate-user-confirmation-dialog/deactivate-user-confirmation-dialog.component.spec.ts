import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateUserConfirmationDialogComponent } from './deactivate-user-confirmation-dialog.component';

describe('DeactivateUserConfirmationDialogComponent', () => {
  let component: DeactivateUserConfirmationDialogComponent;
  let fixture: ComponentFixture<DeactivateUserConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateUserConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateUserConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
