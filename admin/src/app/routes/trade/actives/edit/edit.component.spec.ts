import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeActivesEditComponent } from './edit.component';

describe('TradeActivesEditComponent', () => {
  let component: TradeActivesEditComponent;
  let fixture: ComponentFixture<TradeActivesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeActivesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeActivesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
