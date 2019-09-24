import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeActivesComponent } from './actives.component';

describe('TradeActivesComponent', () => {
  let component: TradeActivesComponent;
  let fixture: ComponentFixture<TradeActivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeActivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeActivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
