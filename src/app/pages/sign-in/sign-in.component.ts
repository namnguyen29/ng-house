import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { merge, Subject, takeUntil } from 'rxjs';

import { checkTitleAsync, noWhiteSpace } from '@app-shared/validators';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
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
  private readonly http = inject(HttpClient);
  public readonly errorMessage = signal({
    email: '',
    title: ''
  });
  public signInForm = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, noWhiteSpace(), Validators.email]
    }),
    password: this.fb.control('', {
      validators: [Validators.required]
    }),
    title: this.fb.control('delectus aut autemM', {
      asyncValidators: checkTitleAsync(this.http),
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
    const validationErrors: ValidationErrors = {
      email: 'Email field is required',
      required: 'Please enter a valid email address',
      whitespace: this.emailControl.errors?.['whitespace']
    };

    Object.entries(validationErrors).forEach(([key, message]) => {
      if (this.emailControl.invalid && this.emailControl.hasError(key)) {
        this.errorMessage.update((value) => ({ ...value, email: message }));
      }
    });
  }
}
