import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Container } from '@/layout/container/container';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, Container],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  standalone: true,
})
export class Hero {
  private router = inject(Router);

  handleSubmit(e: Event, userQuery: string) {
    e.preventDefault();
    this.onSearchChange(userQuery);
  }

  onSearchChange(query: string) {
    if (!query.trim()) return;

    this.router.navigate(['/search'], {
      queryParams: { query },
    });
  }
}
