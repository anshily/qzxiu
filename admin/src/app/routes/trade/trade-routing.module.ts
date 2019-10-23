import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradeCurdComponent } from './curd/curd.component';
import { TradeBannerComponent } from './banner/banner.component';
import { TradeGoodsComponent } from './goods/goods.component';
import { TradeUsersComponent } from './users/users.component';
import { TradeActivesComponent } from './actives/actives.component';
import { TradeShopsComponent } from './shops/shops.component';
import { TradeOrdersComponent } from './orders/orders.component';
import { TradeMessageComponent } from './message/message.component';
import { TradeActivityComponent } from './activity/activity.component';

const routes: Routes = [

  { path: '', component: TradeCurdComponent },
  { path: 'banner', component: TradeBannerComponent },
  { path: 'goods', component: TradeGoodsComponent },
  { path: 'users', component: TradeUsersComponent },
  { path: 'actives', component: TradeActivesComponent },
  { path: 'shops', component: TradeShopsComponent },
  { path: 'orders', component: TradeOrdersComponent },
  { path: 'message', component: TradeMessageComponent },
  { path: 'activity', component: TradeActivityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule { }
