import { Component } from '@angular/core';
import { Container } from '@/layout/container/container';

@Component({
  selector: 'app-testimonials',
  imports: [Container],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
  standalone: true,
})
export class Testimonials {
  dummyTestimonials = [
    { id: 1, name: 'Bang Upin', image: '/testimonial1.png' },
    { id: 2, name: 'Ibuk Sukjian', image: '/testimonial2.png' },
    { id: 3, name: 'Mpok Ina', image: '/testimonial3.png' },
  ];
}
