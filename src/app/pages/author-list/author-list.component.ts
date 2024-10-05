import { Component, inject } from '@angular/core';

import { AuthorDetailComponent } from './components';

import { AuthorsService } from '@app-shared/services';
import { Author } from '@app-shared/interfaces';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [AuthorDetailComponent],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  private readonly authorsService = inject(AuthorsService);
  public authors = this.authorsService.authors;
  public selectedAuthor = this.authors[0];

  public selectAuthor(author: Author): void {
    this.selectedAuthor = author;
  }

  public deleteAuthor(id: number): void {
    this.authors = this.authors.filter((author) => author.id !== id);

    if (this.selectedAuthor.id === id) {
      this.selectedAuthor = this.authors[0];
    }
  }
}
