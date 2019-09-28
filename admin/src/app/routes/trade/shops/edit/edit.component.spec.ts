import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeShopsEditComponent } from './edit.component';

describe('TradeShopsEditComponent', () => {
  let component: TradeShopsEditComponent;
  let fixture: ComponentFixture<TradeShopsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeShopsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeShopsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
