import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSelectorComponent } from './platform-selector.component';

xdescribe('PlatformSelectorComponent', () => {
  let component: PlatformSelectorComponent;
  let fixture: ComponentFixture<PlatformSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatformSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
