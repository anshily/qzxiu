import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeShopsViewComponent } from './view.component';

describe('TradeShopsViewComponent', () => {
  let component: TradeShopsViewComponent;
  let fixture: ComponentFixture<TradeShopsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeShopsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeShopsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
