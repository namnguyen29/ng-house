import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProgressBarComponent } from './components';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, ProgressBarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public user = {
    name: 'Nam',
    age: 40
  };
  public modelName = '';

  public setName(event: Event): void {
    console.log('evt::', event);
    this.modelName = 'Go away!';
  }

  public increase(): void {
    this.user.age += 1;
  }

  public decrease(): void {
    this.user.age -= 1;
  }
}
