import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeActivityEditComponent } from './edit.component';

describe('TradeActivityEditComponent', () => {
  let component: TradeActivityEditComponent;
  let fixture: ComponentFixture<TradeActivityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeActivityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeActivityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
