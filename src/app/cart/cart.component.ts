import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceItemsService } from '../service-items.service';
import { Subscription } from 'rxjs';
import { ItemInCart } from '../models/itemInCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  itemsInCart: ItemInCart[] = [];

  constructor(private serviceItemsService: ServiceItemsService) {}

  ngOnInit(): void {
    this.itemsInCart = this.serviceItemsService.getItemsInCart();
  }

  addOne(item: ItemInCart): void {
    this.serviceItemsService.addToCart(item);
  }
  removeOne(item: ItemInCart): void {
    this.serviceItemsService.removeFromCart(item);
  }
}
