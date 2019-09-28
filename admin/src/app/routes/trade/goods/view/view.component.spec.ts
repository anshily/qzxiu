import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeGoodsViewComponent } from './view.component';

describe('TradeGoodsViewComponent', () => {
  let component: TradeGoodsViewComponent;
  let fixture: ComponentFixture<TradeGoodsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeGoodsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeGoodsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
