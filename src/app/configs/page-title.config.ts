import { ClassProvider, inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
class CustomTitleStrategy extends TitleStrategy {
  private readonly _title = inject(Title);

  public override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);

    if (title) {
      this._title.setTitle(`${title} | Ng House`);
    }
  }
}

export const providePageTitleStrategy = (): ClassProvider => ({
  provide: TitleStrategy,
  useClass: CustomTitleStrategy
});
