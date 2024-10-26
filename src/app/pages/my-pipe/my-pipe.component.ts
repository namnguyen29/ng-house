import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MyItemComponent } from './components';
import { AddressLike } from '@app-shared/interfaces';
import { FormatAddressPipe } from '@app-shared/pipes';

@Component({
  selector: 'app-my-pipe',
  standalone: true,
  imports: [MyItemComponent, DatePipe, FormatAddressPipe],
  templateUrl: './my-pipe.component.html',
  styleUrl: './my-pipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyPipeComponent implements OnInit {
  public today = new Date();
  public user: AddressLike = {
    name: 'Nam Ng',
    address: 'DaNano',
    age: 28,
    country: 'vn'
  };

  public ngOnInit(): void {
    //
  }
}
