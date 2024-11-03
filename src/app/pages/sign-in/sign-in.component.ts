import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { checkTitleAsync, noWhiteSpace } from '@app-shared/validators';
import { HttpClient } from '@angular/common/http';

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
export class SignInComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
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
    //
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
}
