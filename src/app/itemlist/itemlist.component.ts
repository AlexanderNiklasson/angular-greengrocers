import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ServiceItemsService } from '../service-items.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
})
export class ItemlistComponent implements OnInit {
  items: Item[] = [];
  constructor(private serviceItemsService: ServiceItemsService) {}

  ngOnInit(): void {
    this.items = this.serviceItemsService.getItems();
  }

  addToCart(item: Item): void {
    this.serviceItemsService.addToCart(item);
  }
}
