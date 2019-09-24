import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeUsersComponent } from './users.component';

describe('TradeUsersComponent', () => {
  let component: TradeUsersComponent;
  let fixture: ComponentFixture<TradeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
