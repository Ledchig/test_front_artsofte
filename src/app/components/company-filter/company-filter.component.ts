import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompaniesStoreService } from '../../store/companies-store';

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})

@Injectable({providedIn: 'root'})
export class CompanyFilterComponent {
  constructor(private store: CompaniesStoreService) {

  }

  filterForm = new FormGroup({
    companyName: new FormControl(''),
    companyType: new FormControl(''),
    companyIndustry: new FormControl(''),

  })

  types: string[] = [];
  industries: string[] = [];
  ngOnInit() {
    this.store.fetched$.subscribe(() => {
      this.types = this.store.getTypes();
      this.industries = this.store.getIndustries();
    })
  }
  handlerForm() {
    const formControlName = this.filterForm.get('companyName');
    const formControlType = this.filterForm.get('companyType');
    const formControlIndustry = this.filterForm.get('companyIndustry');

    this.store.setFilterParams({
      name: formControlName,
      type: formControlType,
      industry: formControlIndustry,
    });
    this.store.filterCompanies();
  }
}
