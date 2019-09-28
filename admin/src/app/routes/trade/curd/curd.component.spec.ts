import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeCurdComponent } from './curd.component';

describe('TradeCurdComponent', () => {
  let component: TradeCurdComponent;
  let fixture: ComponentFixture<TradeCurdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCurdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
