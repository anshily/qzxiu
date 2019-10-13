import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TradeRoutingModule } from './trade-routing.module';
import { TradeCurdComponent } from './curd/curd.component';
import { TradeCurdEditComponent } from './curd/edit/edit.component';
import { TradeCurdViewComponent } from './curd/view/view.component';
import { TradeBannerComponent } from './banner/banner.component';
import { TradeBannerEditComponent } from './banner/edit/edit.component';
import { TradeBannerViewComponent } from './banner/view/view.component';
import { TradeGoodsComponent } from './goods/goods.component';
import { TradeGoodsEditComponent } from './goods/edit/edit.component';
import { TradeGoodsViewComponent } from './goods/view/view.component';
import { TradeUsersComponent } from './users/users.component';
import { TradeUsersEditComponent } from './users/edit/edit.component';
import { TradeUsersViewComponent } from './users/view/view.component';
import { TradeActivesComponent } from './actives/actives.component';
import { TradeActivesEditComponent } from './actives/edit/edit.component';
import { TradeActivesViewComponent } from './actives/view/view.component';
import { TradeShopsComponent } from './shops/shops.component';
import { TradeShopsEditComponent } from './shops/edit/edit.component';
import { TradeShopsViewComponent } from './shops/view/view.component';
import { TradeOrdersComponent } from './orders/orders.component';
import { TradeOrdersEditComponent } from './orders/edit/edit.component';
import { TradeOrdersViewComponent } from './orders/view/view.component';
import {EditorQuillModule} from "@shared/quill/editor-quill.module";
import {TradeShopsReferrerComponent} from "./shops/referrer/referrer.component";

const COMPONENTS = [
  TradeCurdComponent,
  TradeBannerComponent,
  TradeGoodsComponent,
  TradeUsersComponent,
  TradeActivesComponent,
  TradeShopsComponent,
  TradeOrdersComponent];
const COMPONENTS_NOROUNT = [
  TradeCurdEditComponent,
  TradeCurdViewComponent,
  TradeBannerEditComponent,
  TradeBannerViewComponent,
  TradeGoodsEditComponent,
  TradeGoodsViewComponent,
  TradeUsersEditComponent,
  TradeUsersViewComponent,
  TradeActivesEditComponent,
  TradeActivesViewComponent,
  TradeShopsEditComponent,
  TradeShopsViewComponent,
  TradeOrdersEditComponent,
  TradeOrdersViewComponent,
  TradeShopsReferrerComponent];

@NgModule({
  imports: [
    SharedModule,
    TradeRoutingModule,
    EditorQuillModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TradeModule { }
