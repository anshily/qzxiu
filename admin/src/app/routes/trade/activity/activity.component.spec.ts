import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeActivityComponent } from './activity.component';

describe('TradeActivityComponent', () => {
  let component: TradeActivityComponent;
  let fixture: ComponentFixture<TradeActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
