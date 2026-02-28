import { Container } from '@/layout/container/container';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Logo } from '@/shared/logo/logo';
import { MobileNav } from './mobile-nav/mobile-nav';
import { Store } from '@ngrx/store';
import { selectWishlistProductLength } from '@/stores/wishlist/wishlist.selectors';
import { selectCartTotalItems } from '@/stores/cart/cart.selectors';

@Component({
  selector: 'app-header',
  imports: [CommonModule, Container, RouterModule, Logo, MobileNav, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header implements OnDestroy {
  navLinks = [
    { label: 'Home', path: '' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Cart', path: '/shopping-cart' }
  ];

  // Wishlist Selectors
  private wishlistStore = inject(Store);
  private cartStore = inject(Store);

  // Wishlist Length Selector
  wishlistProductsCount$ = this.wishlistStore.select(
    selectWishlistProductLength
  );

  // Cart Quantity Selector
  cartQuantity$ = this.cartStore.select(selectCartTotalItems);

  scrollY = signal(0);
  isHeaderScrolled = signal<boolean>(false);
  currentPath = signal(window.location.pathname);
  isOpen = signal<boolean>(false);

  // Function which sets the scroll of the window to the scrollY signal.
  scrollHeader() {
    this.scrollY.set(window.scrollY);
  }

  // Function which toggles the isOpen signal.
  toggleMobileMenu() {
    this.isOpen.update((prev) => !prev);
  }

  constructor() {
    window.addEventListener('scroll', () => this.scrollY.set(window.scrollY));

    effect(() => {
      // When the scroll of the window is greater than 0, it sets the isHeaderScrolled signal to true.
      this.isHeaderScrolled.set(this.scrollY() > 0);
    });
  }

  ngOnDestroy(): void {
    // On the onmount of the component, it removes the event listener.
    window.removeEventListener('scroll', () =>
      this.scrollY.set(window.scrollY)
    );
  }
}
