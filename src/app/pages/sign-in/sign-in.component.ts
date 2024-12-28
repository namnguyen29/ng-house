import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { merge, Subject, takeUntil } from 'rxjs';

import { checkTitleAsync, noWhiteSpace } from '@app-shared/validators';
import { TextInputComponent } from '@app-shared/components';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    TextInputComponent,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly fb = inject(FormBuilder);
  public readonly errorMessage = signal({
    email: '',
    title: ''
  });
  public signInForm = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, noWhiteSpace(), Validators.email]
    }),
    password: this.fb.control(''),
    title: this.fb.control('delectus aut autemM', {
      asyncValidators: checkTitleAsync(),
      updateOn: 'blur'
    }),
    rememberMe: this.fb.control(false)
  });

  public ngOnInit(): void {
    this.validateFields();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get emailControl(): FormControl<string | null> {
    return this.signInForm.controls['email'];
  }

  public get titleControl(): FormControl<string | null> {
    return this.signInForm.controls['title'];
  }

  public onSubmit(): void {
    const formValues = this.signInForm.value;
    console.log('formValues::', formValues);
    console.log('is-valid::', this.signInForm.valid);
  }

  public patchValue(): void {
    this.signInForm.patchValue({
      email: 'na_baba@outlook.com'
    });
  }

  public setValue(): void {
    this.signInForm.setValue({
      email: 'not_me@gmail.com',
      password: '4141',
      rememberMe: true,
      title: 'Huhu'
    });
  }

  private validateFields(): void {
    merge(this.emailControl.statusChanges, this.emailControl.valueChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateEmailErrors();
      });

    merge(this.titleControl.statusChanges, this.titleControl.valueChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateTitleErrors();
      });
  }

  private updateTitleErrors(): void {
    if (this.titleControl.hasError('noMatch')) {
      this.errorMessage.update((value) => ({
        ...value,
        title: this.titleControl.errors?.['noMatch']
      }));
    } else {
      this.errorMessage.update((value) => ({ ...value, title: '' }));
    }
  }

  private updateEmailErrors(): void {
    if (this.emailControl.hasError('noMatch')) {
      this.errorMessage.update((value) => ({
        ...value,
        email: this.titleControl.errors?.['noMatch']
      }));
    } else if (this.emailControl.hasError('email')) {
      this.errorMessage.update((value) => ({
        ...value,
        email: 'Please enter a valid email address'
      }));
    } else if (this.emailControl.hasError('required')) {
      this.errorMessage.update((value) => ({
        ...value,
        email: 'Email field is required'
      }));
    } else {
      this.errorMessage.update((value) => ({ ...value, email: '' }));
    }
  }
}
