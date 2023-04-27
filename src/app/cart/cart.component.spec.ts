import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CartComponent } from './cart.component';
import { CartService } from '../cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CartService', ['getItems', 'clearCart']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: spy }],
    }).compileComponents();

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display items from CartService', () => {
    const items = [
      { name: 'Item 1', price: 10, description: '', id: 1},
      { name: 'Item 2', price: 20, description: '', id: 2},
    ];

    cartService.getItems.and.returnValue(items);
    component.items = cartService.getItems();
    fixture.detectChanges();

    const itemElements = fixture.debugElement.queryAll(By.css('.cart-item'));
    expect(itemElements.length).toBe(2);
  });

  it('should submit form and clear cart', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    component.checkoutForm.setValue({ name: 'John Doe', address: '123 Main St' });
    spyOn(console, 'warn');
    submitButton.click();

    expect(cartService.clearCart).toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith('Order submitted', { name: 'John Doe', address: '123 Main St' });
    expect(component.checkoutForm.value).toEqual({ name: null, address: null });
  });
});