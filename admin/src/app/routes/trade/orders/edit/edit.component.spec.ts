import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeOrdersEditComponent } from './edit.component';

describe('TradeOrdersEditComponent', () => {
  let component: TradeOrdersEditComponent;
  let fixture: ComponentFixture<TradeOrdersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeOrdersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeOrdersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
