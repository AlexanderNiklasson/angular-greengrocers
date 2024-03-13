import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceItemsService } from './service-items.service';
import { fetchItemsProvider } from './service-items.service';
import { AppComponent } from './app.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { TotalPriceComponent } from './total-price/total-price.component';

@NgModule({
  declarations: [AppComponent, ItemlistComponent, CartComponent, TotalPriceComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [ServiceItemsService, fetchItemsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
