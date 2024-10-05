import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Author } from '@app-shared/interfaces';

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.scss'
})
export class AuthorDetailComponent {
  @Input({ required: true }) public author!: Author;
  @Output() public selectAuthor = new EventEmitter<Author>();
  @Output() public deleteAuthor = new EventEmitter<number>();
}
