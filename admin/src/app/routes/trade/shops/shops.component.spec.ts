import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeShopsComponent } from './shops.component';

describe('TradeShopsComponent', () => {
  let component: TradeShopsComponent;
  let fixture: ComponentFixture<TradeShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
