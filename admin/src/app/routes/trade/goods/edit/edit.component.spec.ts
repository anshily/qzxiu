import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeGoodsEditComponent } from './edit.component';

describe('TradeGoodsEditComponent', () => {
  let component: TradeGoodsEditComponent;
  let fixture: ComponentFixture<TradeGoodsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeGoodsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeGoodsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
