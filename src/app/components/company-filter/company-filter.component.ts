import { Component, Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    companyType: new FormControl(false),
    companyIndustry: new FormControl(false),

  })

  types: string[] = [];
  industries: string[] = [];
  ngOnInit() {
    this.store.fetched$.subscribe(() => {
      this.types = this.store.getTypes();
      this.industries = this.store.getIndustries();
    })
  }

  filterByName() {
    const formControlName = this.filterForm.get('companyName');
    if (formControlName !== null && formControlName.value !== null) {
      this.store.getFilteredCompaniesByName(formControlName.value);
    }
  }
  filterbyType() {
    const formControlType = this.filterForm.get('companyType');
    if (formControlType !== null && formControlType.value !== null) {
      this.store.getFilteredCompaniesByType(formControlType.value);
    }
  }
  filterByIndustry() {
    const formControlIndustry = this.filterForm.get('companyIndustry');
    if (formControlIndustry !== null && formControlIndustry.value !== null) {
      this.store.getFilteredCompaniesByIndustry(formControlIndustry.value);
    }
  }
}
