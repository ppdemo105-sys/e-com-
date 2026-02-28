import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { ChooseUs } from './choose-us/choose-us';
import { FeaturedProducts } from './featured-products/featured-products';
import { BestExperience } from './best-experience/best-experience';
import { Materials } from './materials/materials';
import { Testimonials } from './testimonials/testimonials';
import { Categories } from './categories/categories';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Hero,
    ChooseUs,
    FeaturedProducts,
    BestExperience,
    Materials,
    Testimonials,
    Categories,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
