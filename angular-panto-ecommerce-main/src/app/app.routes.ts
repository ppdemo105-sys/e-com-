import { Routes } from '@angular/router';
import { Home } from '@/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'shop',
    loadComponent: () => import('@/shop/shop').then((m) => m.Shop),
  },
  {
    path: 'shop/:productSlug',
    loadComponent: () =>
      import('@/shop/product/product').then((m) => m.Product),
  },
  {
    path: 'categories/:categorySlug',
    loadComponent: () =>
      import('@/home/categories/category/category').then((m) => m.Category),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('@/wishlist/wishlist').then((m) => m.Wishlist),
  },
  {
    path: 'shopping-cart',
    loadComponent: () => import('@/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'search',
    loadComponent: () => import('@/search/search').then((m) => m.Search),
  },
  {
    path: 'checkout',
    loadComponent: () => import('@/checkout/checkout').then((m) => m.CheckoutComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('@/about/about').then((m) => m.AboutComponent),
  },
];
