import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.css'
})
export class SvgIconComponent {
  @Input() icon!: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() size?: number = 24;
  @Input() fill?: string;
  @Input() class?: string;

  getPlatform(platformName: string): string {
    const platforms = ['playstation', 'xbox', 'nintendo', 'steam'];
    const foundPlatform = platforms.find(platform => platformName.toLowerCase().includes(platform));
  
    return foundPlatform || ''; 
  }
}
