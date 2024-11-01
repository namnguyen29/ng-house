import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@app-containers/layouts';
import { HomeComponent } from '@app-pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
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
        // learn rxjs - hoo in this page
        path: 'my-pipe',
        loadComponent: async () =>
          (await import('./pages/my-pipe/my-pipe.component')).MyPipeComponent,
        title: 'My Pipe | Ng House'
      },
      {
        // learn rxjs - subject in this page
        path: 'my-subject',
        loadComponent: async () =>
          (await import('./pages/my-subject/my-subject.component')).MySubjectComponent,
        title: 'My Subject | Ng House'
      }
    ]
  }
];
