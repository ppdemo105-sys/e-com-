import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [CommonModule, RouterModule],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
  standalone: true,
})
export class Logo {
  className = input<string>('');
}
