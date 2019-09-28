import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeBannerComponent } from './banner.component';

describe('TradeBannerComponent', () => {
  let component: TradeBannerComponent;
  let fixture: ComponentFixture<TradeBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
