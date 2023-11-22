import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardSkeletonComponent } from './game-card-skeleton.component';

describe('GameCardSkeletonComponent', () => {
  let component: GameCardSkeletonComponent;
  let fixture: ComponentFixture<GameCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
