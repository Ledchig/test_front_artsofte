import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompanyItemComponent } from "../../components/company-item/company-item.component";
import { CompanyFilterComponent } from "../../components/company-filter/company-filter.component"
import { CompaniesStoreService } from '../../store/companies-store';
import { ICompany } from '../../interfaces/ICompany';

@Component({
    selector: 'app-company-list',
    standalone: true,
    templateUrl: './company-list.component.html',
    styleUrl: './company-list.component.scss',
    imports: [
      HttpClientModule,
      CompanyItemComponent,
      CompanyFilterComponent
    ]
})

@Injectable({providedIn: 'root'})
export class CompanyListComponent implements OnInit {
  companies: any = [];
  
  constructor(private http: HttpClient, private CompaniesStoreService: CompaniesStoreService) {
  }
  
  fetchData() {
    this.http.get('https://random-data-api.com/api/company/random_company?size=100').subscribe((data) => {
      this.CompaniesStoreService.addCompanies(data);
      this.companies = this.CompaniesStoreService.getCompanies();
    });
  }

  ngOnInit(): void {
    this.companies = this.CompaniesStoreService.getCompanies()
    if (this.companies.length === 0) {
      this.fetchData();
    }
  };
}
