import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartProducts, selectCartTotalPrice } from '@/stores/cart/cart.selectors';
import { Container } from '@/layout/container/container';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, Container, ReactiveFormsModule],
  template: `
    <section class="py-10">
      <app-container className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Checkout Form -->
        <div class="lg:col-span-2">
          <h2 class="text-3xl font-bold mb-6">Checkout</h2>
          
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Contact Information -->
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">Contact Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" formControlName="email" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" id="phone" formControlName="phone" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">Shipping Address</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="fullName" formControlName="fullName" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                </div>
                <div class="md:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" id="address" formControlName="address" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                </div>
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" id="city" formControlName="city" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                  <input type="text" id="state" formControlName="state" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                </div>
                <div>
                  <label for="postalCode" class="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" id="postalCode" formControlName="postalCode" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                </div>
                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                  <select id="country" formControlName="country" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent">
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">Payment Method</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <input id="cod" name="paymentMethod" type="radio" value="cod" formControlName="paymentMethod" 
                    class="h-4 w-4 text-accent focus:ring-accent border-gray-300">
                  <label for="cod" class="ml-3 block text-sm font-medium text-gray-700">Cash on Delivery (COD)</label>
                </div>
                <div class="flex items-center">
                  <input id="card" name="paymentMethod" type="radio" value="card" formControlName="paymentMethod" 
                    class="h-4 w-4 text-accent focus:ring-accent border-gray-300">
                  <label for="card" class="ml-3 block text-sm font-medium text-gray-700">Credit/Debit Card</label>
                </div>
                <div class="flex items-center">
                  <input id="upi" name="paymentMethod" type="radio" value="upi" formControlName="paymentMethod" 
                    class="h-4 w-4 text-accent focus:ring-accent border-gray-300">
                  <label for="upi" class="ml-3 block text-sm font-medium text-gray-700">UPI Payment</label>
                </div>
              </div>
            </div>

            <!-- Order Button -->
            <button type="submit" 
              class="w-full bg-accent text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-accent/90 transition-colors"
              [disabled]="checkoutForm.invalid || cartProducts().length === 0">
              Place Order
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="lg:sticky lg:top-10 h-fit">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Order Summary</h3>
            
            <!-- Order Items -->
            <div class="space-y-4 mb-6">
              @for (item of cartProducts(); track item.id) {
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img [src]="item.image_path" [alt]="item.name" class="w-16 h-16 object-cover rounded">
                    <div>
                      <h4 class="font-medium">{{ item.name }}</h4>
                      <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                    </div>
                  </div>
                  <span class="font-medium">{{ (item.price * item.quantity) | currency:'INR':'symbol':'1.0-0' }}</span>
                </div>
              }
            </div>

            <!-- Order Total -->
            <div class="border-t border-gray-200 pt-4 space-y-2">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>{{ cartTotal() | currency:'INR':'symbol':'1.0-0' }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div class="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>{{ cartTotal() | currency:'INR':'symbol':'1.0-0' }}</span>
              </div>
            </div>
          </div>

          <!-- Back to Cart -->
          <div class="mt-4 text-center">
            <a [routerLink]="['/shopping-cart']" class="text-accent hover:underline">
              ← Back to Cart
            </a>
          </div>
        </div>
      </app-container>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      min-height: calc(100vh - 80px);
    }
  `]
})
export class CheckoutComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  cartProducts = this.store.selectSignal(selectCartProducts);
  cartTotal = this.store.selectSignal(selectCartTotalPrice);

  checkoutForm: FormGroup = this.fb.group({
    // Contact Information
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    
    // Shipping Address
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    country: ['India', Validators.required],
    
    // Payment Method
    paymentMethod: ['cod', Validators.required],
    
    // Order Notes (optional)
    notes: [''],
  });

  onSubmit() {
    if (this.checkoutForm.valid && this.cartProducts().length > 0) {
      console.log('Order submitted:', this.checkoutForm.value);
      
      // Here you would typically send the order to your backend
      // and handle the order confirmation
      
      // Show success message
      alert('Order placed successfully! Thank you for your purchase!');
      
      // Clear the cart after successful order
      import('@/stores/cart/cart.actions').then(actions => {
        this.store.dispatch(actions.clearCart());
      });
      
      // Navigate to home page
      this.router.navigate(['/']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.values(this.checkoutForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
