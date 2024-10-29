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
        title: 'Home | Ng House'
      },
      {
        // learn rxjs in this page
        path: 'fragments',
        loadComponent: async () =>
          (await import('./pages/fragments/fragments.component')).FragmentsComponent,
        title: 'Fragment List'
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
        title: 'Authors | Ng House'
      },
      {
        path: 'my-pipe',
        loadComponent: async () =>
          (await import('./pages/my-pipe/my-pipe.component')).MyPipeComponent,
        title: 'My Pipe | Ng House'
      }
    ]
  }
];
