import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserCommentComponent } from './auth-user-comment.component';

describe('AuthUserCommentComponent', () => {
  let component: AuthUserCommentComponent;
  let fixture: ComponentFixture<AuthUserCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthUserCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUserCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
