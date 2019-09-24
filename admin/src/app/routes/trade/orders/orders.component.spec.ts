import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeOrdersComponent } from './orders.component';

describe('TradeOrdersComponent', () => {
  let component: TradeOrdersComponent;
  let fixture: ComponentFixture<TradeOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
