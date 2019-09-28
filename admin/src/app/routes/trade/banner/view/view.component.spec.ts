import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeBannerViewComponent } from './view.component';

describe('TradeBannerViewComponent', () => {
  let component: TradeBannerViewComponent;
  let fixture: ComponentFixture<TradeBannerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeBannerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeBannerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
