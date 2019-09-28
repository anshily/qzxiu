import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeActivesViewComponent } from './view.component';

describe('TradeActivesViewComponent', () => {
  let component: TradeActivesViewComponent;
  let fixture: ComponentFixture<TradeActivesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeActivesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeActivesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
