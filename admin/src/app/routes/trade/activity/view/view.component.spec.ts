import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeActivityViewComponent } from './view.component';

describe('TradeActivityViewComponent', () => {
  let component: TradeActivityViewComponent;
  let fixture: ComponentFixture<TradeActivityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeActivityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
