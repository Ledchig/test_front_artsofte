import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompanyItemComponent } from "../../components/company-item/company-item.component";
import { CompanyFilterComponent } from "../../components/company-filter/company-filter.component"
import { CompaniesStoreService } from '../../store/companies-store';
import { ICompany } from '../../interfaces/ICompany';
import { CompanySortComponent } from "../../components/company-sort/company-sort.component";

@Component({
    selector: 'app-company-list',
    standalone: true,
    templateUrl: './company-list.component.html',
    styleUrl: './company-list.component.scss',
    imports: [
        HttpClientModule,
        CompanyItemComponent,
        CompanyFilterComponent,
        CompanySortComponent
    ]
})

@Injectable({providedIn: 'root'})
export class CompanyListComponent implements OnInit {
  constructor(private http: HttpClient, private store: CompaniesStoreService) {
  }

  companies: ICompany[] = [];
  
  
  fetchData() {
    this.http.get('https://random-data-api.com/api/company/random_company?size=100').subscribe((data) => {
      this.store.setCompanies(data);
      this.store.toogleFetched();
    });
  }

  ngOnInit() {
    this.store.companiesForView$.subscribe(() => {
      this.companies = this.store.getCompanies();
    })
    if (this.companies.length === 0) {
      this.fetchData();
    }
  };
}
