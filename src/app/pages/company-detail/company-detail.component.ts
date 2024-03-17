import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompaniesStoreService } from '../../store/companies-store';
import { ICompany } from '../../interfaces/ICompany';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})

@Injectable({providedIn: 'root'})
export class CompanyDetailComponent {
  id: string | null = '';
  company: ICompany | undefined;
  constructor(private activatedRoute: ActivatedRoute, private store: CompaniesStoreService) {

  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.company = this.store.getCompanyById(this.id);
    console.log(this.company);
  }
}
