import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'product-item',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  product: Product = {
    id: 1,
    description: 'SSD hard drive',
    available: '2016-10-03',
    price: 75,
    imageUrl: 'assets/ssd.jpg',
    rating: 5,
  };
  showImage = true;
}
