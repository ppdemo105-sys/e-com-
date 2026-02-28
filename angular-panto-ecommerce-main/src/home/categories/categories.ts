import { Component } from '@angular/core';
import { Container } from '@/layout/container/container';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [Container, CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
  standalone: true,
})
export class Categories {
  categories: { name: string; categorySlug: string; image: string }[] = [
    { name: 'Sofas', categorySlug: 'sofa', image: 'sofas.jpg' },
    { name: 'Garden', categorySlug: 'garden', image: 'garden.jpeg' },
    { name: 'Chairs', categorySlug: 'chair', image: 'chair.jpg' },
    { name: 'Stools', categorySlug: 'stool', image: 'stool.jpg' },
    { name: 'Desks', categorySlug: 'desk', image: 'desk.jpg' },
    { name: 'Kitchen', categorySlug: 'kitchen', image: 'kitchen.jpg' },
    { name: 'Lamps', categorySlug: 'lamp', image: 'lamp.jpg' },
    { name: 'Mirrors', categorySlug: 'mirror', image: 'mirror.jpg' },
    { name: 'Wardrobe', categorySlug: 'wardrove', image: 'wardrobe.jpg' },
    { name: 'Matress', categorySlug: 'matress', image: 'matress.jpg' },
    { name: 'Tables', categorySlug: 'table', image: 'table.jpg' },
    { name: 'TV-Table', categorySlug: 'tv table', image: 'tv-table.jpg' },
  ];
}
