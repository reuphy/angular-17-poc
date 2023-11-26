import { combineLatest } from 'rxjs';
import { ComponentFixture, TestBed, async, fakeAsync, waitForAsync } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show a loading indicator while the products are being loaded', () => {
    expect(component.products()?.isLoading).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Loading...');
  });

  it('should hide the loading indicator when the products are loaded', waitForAsync(() => {
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        expect(component.products()?.isLoading).not.toBe(true);
      });
  }));

  it('should show the products when they are loaded', waitForAsync(() => {
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        expect(component.products()?.value?.length).toBeGreaterThan(0);
      });
  }));
});
