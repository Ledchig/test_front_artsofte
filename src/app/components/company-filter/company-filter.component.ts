import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-filter.component.html',
  styleUrl: './company-filter.component.scss'
})

export class CompanyFilterComponent {
  filterForm = new FormGroup({
    companyName: new FormControl(''),
    companyType: new FormControl(false),
    companyIndustry: new FormControl(false),

  })
  filterByName() {
  }
  filterbyType() {

  }
  filterByIndustry() {
    
  }
}
