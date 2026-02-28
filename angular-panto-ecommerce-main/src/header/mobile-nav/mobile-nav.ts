import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Logo } from '@/shared/logo/logo';

@Component({
  selector: 'app-mobile-nav',
  imports: [CommonModule, RouterModule, Logo],
  templateUrl: './mobile-nav.html',
  styleUrl: './mobile-nav.css',
  standalone: true,
})
export class MobileNav implements OnDestroy {
  navLinks = [
    { label: 'Home', path: '' },
    { label: 'Shop', path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  currentPath = signal(window.location.pathname);
  isMenuOpen = input.required<boolean>();
  toggleMenu = output<boolean>();

  toggleMobileMenu() {
    this.toggleMenu.emit(true);
  }

  constructor() {
    effect(() => {
      this.isMenuOpen()
        ? document.body.classList.add('overflow-hidden')
        : document.body.classList.remove('overflow-hidden');
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }
}
