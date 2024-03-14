import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ServiceItemsService,
  fetchItemsProvider,
} from './service-items.service';
import { AppComponent } from './app.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { TotalPriceComponent } from './total-price/total-price.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'store', component: ItemlistComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/store', pathMatch: 'full' }, // Redirect to items component by default
];

@NgModule({
  declarations: [
    AppComponent,
    ItemlistComponent,
    CartComponent,
    TotalPriceComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [ServiceItemsService, fetchItemsProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
