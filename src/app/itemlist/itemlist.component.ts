import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { ServiceItemsService } from '../service-items.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
})
export class ItemlistComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  showModal: boolean[] = [];
  timeoutIds: any[] = [];
  selectedFilter: 'none' | 'fruit' | 'berry' | 'vegetable' | undefined = 'none';

  constructor(private serviceItemsService: ServiceItemsService) {}

  ngOnInit(): void {
    this.items = this.serviceItemsService.getItems();
    for (let i = 0; i < this.items.length; i++) {
      this.showModal[i] = false;
      this.timeoutIds[i] = null;
    }
  }

  addToCart(item: Item, index: number): void {
    this.serviceItemsService.addToCart(item);
    if (!this.timeoutIds[index]) {
      this.showModal[index] = true;
      this.timeoutIds[index] = setTimeout(() => {
        this.showModal[index] = false;
        this.clearTimeout(index);
      }, 2500);
    } else {
      this.resetTimer(index);
    }
  }

  resetTimer(index: number) {
    this.clearTimeout(index);
    this.timeoutIds[index] = setTimeout(() => {
      this.showModal[index] = false;
      this.clearTimeout(index);
    }, 2500);
  }

  clearTimeout(index: number) {
    if (this.timeoutIds[index]) {
      clearTimeout(this.timeoutIds[index]);
      this.timeoutIds[index] = null;
    }
  }

  sortByPrice(): void {
    this.items.sort((a, b) => a.price - b.price);
    this.hideAllModals();
  }

  sortByName(): void {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
    this.hideAllModals();
  }

  sortByType(): void {
    this.hideAllModals();
    if (this.selectedFilter === 'none') {
      this.items = this.serviceItemsService.getItems();
    } else if (this.selectedFilter === 'fruit') {
      this.items = this.serviceItemsService.getItems();
      this.items = this.items.filter(
        (item) =>
          ![
            'berry',
            'blueberry',
            'bell pepper',
            'eggplant',
            'beetroot',
            'carrot',
          ].includes(item.name.toLowerCase())
      );
    } else if (this.selectedFilter === 'berry') {
      this.items = this.serviceItemsService.getItems();
      this.items = this.items.filter(
        (item) =>
          ![
            'bananas',
            'apple',
            'avocado',
            'apricot',
            'eggplant',
            'carrot',
            'beetroot',
            'bell pepper',
          ].includes(item.name.toLowerCase())
      );
    } else if (this.selectedFilter === 'vegetable') {
      this.items = this.serviceItemsService.getItems();
      this.items = this.items.filter(
        (item) =>
          ![
            'bananas',
            'apple',
            'avocado',
            'apricot',
            'berry',
            'blueberry',
          ].includes(item.name.toLowerCase())
      );
    }
  }

  ngOnDestroy() {
    this.timeoutIds.forEach((timeoutId, index) => {
      this.clearTimeout(index);
    });
  }
  hideAllModals(): void {
    this.showModal = this.showModal.map(() => false);
  }
}
