import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./containers/layouts/main-layout/main-layout.component')).MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: async () => (await import('./pages/home/home.component')).HomeComponent,
        title: 'Homie | Ng House'
      },
      {
        path: 'details/:id',
        loadComponent: async () =>
          (await import('./pages/detail/detail.component')).DetailComponent,
        title: 'Home details'
      },
      {
        path: 'product',
        loadComponent: async () =>
          (await import('./pages/product/product.component')).ProductComponent,
        title: 'Product'
      },
      {
        path: 'authors',
        loadComponent: async () =>
          (await import('./pages/author-list/author-list.component')).AuthorListComponent,
        title: 'Authors'
      }
    ]
  }
];
