import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appTabPanel]',
  standalone: true
})
export class TabContentDirective {
  private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
