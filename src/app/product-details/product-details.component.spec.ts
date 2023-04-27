import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { CartService } from '../cart.service';
import { products } from '../products';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let activatedRoute: ActivatedRoute;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let alertSpy: jasmine.Spy;

  beforeEach(() => {
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          has: (name: string) => false,
          get: (name: string) => 1, // productIdFromRoute, note NOT the array index;
          getAll: (name: string) => [],
        },
        data: of({ product: products[0] })
      }
    };
    const cartServiceSpyObj = jasmine.createSpyObj('CartService', ['addToCart']);
    
    alertSpy = spyOn(window, 'alert');
    
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: CartService, useValue: cartServiceSpyObj },
      ]
    });

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product by id', () => {
    fixture.detectChanges();
    expect(component.product).toEqual(products[0]);
  });

  it('should add product to cart', () => {
    const product = products[0];
    fixture.detectChanges();
    component.addToCart(product);
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(product);
  });
  
  it('should call window.alert', () => {
    const product = products[0];
    fixture.detectChanges();
    component.addToCart(product);
    expect(alertSpy).toHaveBeenCalledWith('Product added!');
  });
});
