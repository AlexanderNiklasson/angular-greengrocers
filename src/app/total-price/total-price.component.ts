import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceItemsService } from '../service-items.service';
import { Subscription } from 'rxjs';
import { ItemInCart } from '../models/itemInCart';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.css'],
})
export class TotalPriceComponent implements OnInit, OnDestroy {
  totalPrice: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private serviceItemsService: ServiceItemsService) {}

  ngOnInit(): void {
    this.calculateTotalPrice();

    this.cartSubscription = this.serviceItemsService
      .cartChanges()
      .subscribe(() => {
        this.calculateTotalPrice();
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  private calculateTotalPrice(): void {
    const itemsInCart = this.serviceItemsService.getItemsInCart();
    this.totalPrice = itemsInCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
