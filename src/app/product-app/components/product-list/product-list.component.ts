import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatCardModule} from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterOutlet, MatToolbarModule, MatButtonModule], 
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productService = inject(ProductService)
  products = toSignal(this.productService.getProducts())
}
