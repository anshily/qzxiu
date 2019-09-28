import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeOrdersViewComponent } from './view.component';

describe('TradeOrdersViewComponent', () => {
  let component: TradeOrdersViewComponent;
  let fixture: ComponentFixture<TradeOrdersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeOrdersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
