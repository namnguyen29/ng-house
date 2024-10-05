import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent {
  @Input() public checked = false;
  @Output() public checkedChange = new EventEmitter<boolean>();

  public toggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
