import { Component } from '@angular/core';
import { Container } from '@/layout/container/container';
import { Logo } from '@/shared/logo/logo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [Container, Logo, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  footerLinks = [
    {
      title: 'Services',
      links: [
        { title: 'Email', link: '' },
        { title: 'Campaigns', link: '' },
        { title: 'Branding', link: '' },
      ],
    },

    {
      title: 'Furniture',
      links: [
        { title: 'Sofas', link: '/categories/sofa' },
        { title: 'Chairs', link: '/categories/chair' },
        { title: 'See All', link: '/shop' },
      ],
    },

    {
      title: 'Follow Us',
      links: [
        { title: 'Facebook', link: 'https://facebook.com' },
        { title: 'Twitter', link: 'https://x.com/' },
        { title: 'Instagram', link: 'https://instagram.com' },
      ],
    },
  ];

  currentYear = new Date().getFullYear();
}
