import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeUsersEditComponent } from './edit.component';

describe('TradeUsersEditComponent', () => {
  let component: TradeUsersEditComponent;
  let fixture: ComponentFixture<TradeUsersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeUsersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeUsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
