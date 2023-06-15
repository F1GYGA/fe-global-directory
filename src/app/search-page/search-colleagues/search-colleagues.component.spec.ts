import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchColleaguesComponent } from './search-colleagues.component';

describe('SearchColleaguesComponent', () => {
  let component: SearchColleaguesComponent;
  let fixture: ComponentFixture<SearchColleaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchColleaguesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchColleaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
