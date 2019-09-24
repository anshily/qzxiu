import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeBannerEditComponent } from './edit.component';

describe('TradeBannerEditComponent', () => {
  let component: TradeBannerEditComponent;
  let fixture: ComponentFixture<TradeBannerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeBannerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeBannerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
