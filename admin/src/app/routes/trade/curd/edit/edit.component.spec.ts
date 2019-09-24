import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeCurdEditComponent } from './edit.component';

describe('TradeCurdEditComponent', () => {
  let component: TradeCurdEditComponent;
  let fixture: ComponentFixture<TradeCurdEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCurdEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCurdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
