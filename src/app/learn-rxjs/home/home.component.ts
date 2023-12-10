import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, of, take, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit() {
    const btn = document.getElementById('test') as HTMLButtonElement;
    const numbers = of(1, 2, 3, 4, 5);

    btn.addEventListener('click', () => {
      const data$ = interval(1000).pipe(take(3));
    
      // const error$ = throwError(() => ('error'))

      const observer: any = {
        next: (value: any) => console.log(value),
        error: (error: any) => console.log(error),
        complete: () => console.log('complete')
      }

      data$
        .subscribe(observer)
    })
  }
}
