import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

import { HousingLocation } from '@app-shared/interfaces';
import { HousingService } from '@app-shared/services';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly housingService = inject(HousingService);
  private housingLocationId = -1;
  public housingLocation$!: Observable<HousingLocation | undefined>;
  public applyForm = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
    email: this.fb.control('')
  });

  public ngOnInit(): void {
    this.housingLocationId = this.route.snapshot.params['id'];
    this.housingLocation$ = this.housingService.getHousingLocationById(this.housingLocationId);
  }

  public submitApplication(): void {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
