import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeGoodsComponent } from './goods.component';

describe('TradeGoodsComponent', () => {
  let component: TradeGoodsComponent;
  let fixture: ComponentFixture<TradeGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
