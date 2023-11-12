import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFilterPipe, ProductItemComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  title = 'Mi lista de productos';
  headers = {
    image: 'Imagen',
    description: 'Producto',
    price: 'Precio',
    available: 'Disponible',
    rating: 'Puntuación',
  };
  products: Product[] = [
    {
      id: 1,
      description: 'SSD hard drive',
      available: '2016-10-03',
      price: 75,
      imageUrl: 'assets/ssd.jpg',
      rating: 5,
    },
    {
      id: 2,
      description: 'LGA1151 Motherboard',
      available: '2016-09-15',
      price: 96.95,
      imageUrl: 'assets/motherboard.jpg',
      rating: 4,
    },
  ];
  showImage = true;
  newProduct!: Product;
  fileName = '';
  search = '';
  constructor() {
    this.resetProduct();
  }
  ngOnInit(): void {
    console.log('Método onInit');
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newProduct.imageUrl = reader.result as string;
    });
  }

  addProduct() {
    this.products = [...this.products, this.newProduct];
    this.fileName = '';
    this.resetProduct();
  }

  private resetProduct() {
    this.newProduct = {
      description: '',
      available: '',
      imageUrl: '',
      rating: 0,
      price: 0,
    };
  }
}
