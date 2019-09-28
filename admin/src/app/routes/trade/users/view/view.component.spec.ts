import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeUsersViewComponent } from './view.component';

describe('TradeUsersViewComponent', () => {
  let component: TradeUsersViewComponent;
  let fixture: ComponentFixture<TradeUsersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeUsersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
