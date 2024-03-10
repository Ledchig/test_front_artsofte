import { Routes } from '@angular/router';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';

export const routes: Routes = [
    { path: '', component: CompanyListComponent, pathMatch: 'full' },
    { path: 'company/:id', component: CompanyDetailComponent }
];
