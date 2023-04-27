import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CartService } from './cart.service';
import { Product } from './products';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CartService ]
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 10, description: '' };
    service.addToCart(product);
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0]).toEqual(product);
  });

  it('should clear the cart', () => {
    const product: Product = { id: 1, name: 'Test Product', price: 10, description: '' };
    service.addToCart(product);
    service.clearCart();
    expect(service.getItems().length).toBe(0);
  });

  it('should get shipping prices', () => {
    const mockShippingPrices = [
      { type: 'Standard', price: 5 },
      { type: 'Express', price: 10 }
    ];

    service.getShippingPrices().subscribe((shippingPrices) => {
      expect(shippingPrices).toEqual(mockShippingPrices);
    });

    const req = httpMock.expectOne('/assets/shipping.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockShippingPrices);
  });
});
