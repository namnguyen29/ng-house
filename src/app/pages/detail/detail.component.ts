import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { HousingLocation } from '../../interfaces/housing-location';
import { HousingService } from '../../services/housing.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { DestroyService } from '../../services/destroy.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly housingService = inject(HousingService);
  private readonly destroyService = inject(DestroyService);
  public housingLocationId = -1;
  public housingLocation$!: Observable<HousingLocation | undefined>;
  public applyForm = this.fb.group({
    firstName: this.fb.control(''),
    lastName: this.fb.control(''),
    email: this.fb.control('')
  });

  public ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroyService._destroy$)).subscribe((detailParam) => {
      this.housingLocationId = +detailParam['id'];
      this.housingLocation$ = this.housingService.getHousingLocationById(this.housingLocationId);
    });
  }

  public submitApplication(): void {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
