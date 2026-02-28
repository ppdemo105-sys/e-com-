import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Container } from '@/layout/container/container';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, Container],
  template: `
    <div class="py-16 bg-gray-50">
      <app-container>
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">About Our E-Commerce Store</h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to providing the best shopping experience with high-quality products and excellent customer service.
          </p>
        </div>

        <!-- Features Section -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div *ngFor="let feature of features" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div class="text-blue-600 text-4xl mb-4">{{feature.icon}}</div>
            <h3 class="text-xl font-semibold mb-2">{{feature.title}}</h3>
            <p class="text-gray-600">{{feature.description}}</p>
          </div>
        </div>

        <!-- Team Section -->
        <div class="text-center">
          <div class="mb-8">
            <a routerLink="/" class="inline-block mb-8 text-blue-600 hover:underline">
              &larr; Back to Home
            </a>
          </div>
          <h2 class="text-3xl font-bold mb-8">Our Team</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div *ngFor="let member of teamMembers" class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img [src]="member.image" [alt]="member.name" class="w-full h-full object-cover">
              </div>
              <h3 class="text-xl font-semibold">{{member.name}}</h3>
              <p class="text-blue-600 mb-2">{{member.role}}</p>
              <p class="text-gray-600 text-sm">{{member.bio}}</p>
            </div>
          </div>
        </div>
      </app-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: calc(100vh - 80px);
    }
  `]
})
export class AboutComponent {
  features: Feature[] = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your products delivered quickly with our reliable shipping partners.'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Your transactions are safe with our secure payment gateways.'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: 'Not satisfied? Return your order within 30 days for a full refund.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Shop on the go with our mobile-optimized website.'
    },
    {
      icon: '💯',
      title: 'Quality Products',
      description: 'We source only the best quality products for our customers.'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Our customer support team is always here to help you.'
    }
  ];

  teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'With over 10 years of experience in e-commerce, John leads our company with vision and passion.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'Head of Operations',
      bio: 'Jane ensures our operations run smoothly and efficiently on a daily basis.',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Customer Support',
      bio: 'Mike and his team are always ready to assist you with any questions or concerns.',
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];
}
