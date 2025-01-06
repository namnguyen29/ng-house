import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

import { Observable } from 'rxjs';

import { HousingLocation } from '@app-shared/interfaces';
import { HousingService } from '@app-shared/services';

@Component({
    selector: 'app-detail',
    imports: [RouterLink, AsyncPipe, ReactiveFormsModule, NgOptimizedImage],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly housingService = inject(HousingService);
  private housingLocationId = -1;
  public housingLocation$!: Observable<HousingLocation | undefined>;
  public applyForm = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
    email: this.fb.control('')
  });
  public firstnameRef = viewChild<ElementRef<HTMLInputElement>>('firstName');

  public ngOnInit(): void {
    this.housingLocationId = this.route.snapshot.params['id'];
    this.housingLocation$ = this.housingService.getHousingLocationById(this.housingLocationId);
    this.firstnameRef()?.nativeElement.focus();
  }

  public submitApplication(): void {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
