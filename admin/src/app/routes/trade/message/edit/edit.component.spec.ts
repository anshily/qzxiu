import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeMessageEditComponent } from './edit.component';

describe('TradeMessageEditComponent', () => {
  let component: TradeMessageEditComponent;
  let fixture: ComponentFixture<TradeMessageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeMessageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeMessageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
