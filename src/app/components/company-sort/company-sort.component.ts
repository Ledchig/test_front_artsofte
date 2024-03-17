import { Component, Injectable } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CompaniesStoreService } from '../../store/companies-store';

@Component({
  selector: 'app-company-sort',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-sort.component.html',
  styleUrl: './company-sort.component.scss'
})

@Injectable({providedIn: 'root'})
export class CompanySortComponent {
  constructor(private store: CompaniesStoreService) {

  }

  sortParam = new FormControl('');

  handleSelect() {
    const param = this.sortParam.value;
    this.store.setSortParam(param)
    this.store.sort();
  }
}
