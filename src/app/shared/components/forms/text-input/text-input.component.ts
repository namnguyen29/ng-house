import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

import { TextInputProps } from '@app-shared/interfaces';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [NzInputModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements AfterViewInit, ControlValueAccessor {
  @Input({ required: true }) public props: TextInputProps = {
    id: '',
    label: '',
    name: '',
    placeholder: '',
    type: 'text',
    multi: false
  };
  @ViewChild('inputRef') public inputRef!: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  public value = '';
  public disabled = false;

  public ngAfterViewInit(): void {
    if (this.props.autofocus) {
      this.inputRef.nativeElement.focus();
    }
  }

  public handleOnTouched(): void {
    return;
  }

  public handleOnChanged(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onChanged(inputValue);
    this.handleOnTouched();
  }

  public writeValue(value: string): void {
    this.onChanged(value);
  }

  // eslint-disable-next-line no-unused-vars
  public registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.handleOnTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private onChanged(value: string): void {
    this.value = value;
  }
}
