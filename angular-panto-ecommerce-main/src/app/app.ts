import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@/header/header';
import { CommonModule } from '@angular/common';
import { Footer } from '@/footer/footer';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Footer, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected title = 'Panto';
}
