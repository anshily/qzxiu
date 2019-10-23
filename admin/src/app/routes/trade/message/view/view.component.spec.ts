import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeMessageViewComponent } from './view.component';

describe('TradeMessageViewComponent', () => {
  let component: TradeMessageViewComponent;
  let fixture: ComponentFixture<TradeMessageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeMessageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeMessageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
