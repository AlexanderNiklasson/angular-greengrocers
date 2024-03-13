import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/item';
import { ItemInCart } from './models/itemInCart';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceItemsService {
  items: Item[] = [];
  itemCart: ItemInCart[] = [];
  private cartSubject = new BehaviorSubject<ItemInCart[]>(this.itemCart);

  constructor(private http: HttpClient) {}

  fetchItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>('https://boolean-api-server.fly.dev/groceries/')
      .pipe(
        tap((items) => (this.items = items))
      );
  }

  addToCart(item: Item): void {
    const index = this.itemCart.findIndex((i) => i.name === item.name);
    if (index !== -1) {
      this.itemCart[index].quantity++;
    } else {
      this.itemCart.push({ ...item, quantity: 1 });
    }
    this.cartSubject.next(this.itemCart);
  }

  removeFromCart(item: ItemInCart): void {
    const index = this.itemCart.findIndex((i) => i.name === item.name);
    if (index !== -1) {
      this.itemCart[index].quantity--;
      if (this.itemCart[index].quantity === 0) {
        this.itemCart.splice(index, 1);
      }
      this.cartSubject.next(this.itemCart);
    }
  }

  getItems(): Item[] {
    return this.items;
  }

  getItemsInCart(): ItemInCart[] {
    return this.itemCart;
  }

  cartChanges(): Observable<ItemInCart[]> {
    return this.cartSubject.asObservable();
  }
}

export function fetchItemsFactory(
  service: ServiceItemsService
): () => Observable<any> {
  return () => service.fetchItems();
}

export const fetchItemsProvider = {
  provide: APP_INITIALIZER,
  useFactory: fetchItemsFactory,
  deps: [ServiceItemsService],
  multi: true,
};
