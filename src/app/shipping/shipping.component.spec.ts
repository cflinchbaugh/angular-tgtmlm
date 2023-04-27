import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingComponent } from './shipping.component';
import { CartService } from '../cart.service';
import { of } from 'rxjs';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getShippingPrices']);

    await TestBed.configureTestingModule({
      declarations: [ ShippingComponent ],
      providers: [{ provide: CartService, useValue: cartServiceSpy }]
    })
    .compileComponents();

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get shipping prices', () => {
    const shippingPrices = [{ type: 'Standard', price: 10 }, { type: 'Express', price: 20 }];
  
    cartService.getShippingPrices.and.returnValue(of(shippingPrices));
  
    fixture.detectChanges();
  
    component.shippingCosts.subscribe(prices => {
      expect(prices).toEqual(shippingPrices);
    });
  });

});

