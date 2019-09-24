import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeCurdViewComponent } from './view.component';

describe('TradeCurdViewComponent', () => {
  let component: TradeCurdViewComponent;
  let fixture: ComponentFixture<TradeCurdViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCurdViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCurdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
