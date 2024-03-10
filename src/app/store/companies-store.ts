import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICompany } from "../interfaces/ICompany";

@Injectable({providedIn: 'root'})
export class CompaniesStoreService {
    private readonly _companies = new BehaviorSubject<ICompany[]>([]);
    readonly companies$ = this._companies.asObservable();
    private set companies(data: ICompany[]) {
        this._companies.next(data);
    }

    getCompanies(){
        return this._companies.getValue();
    }

    getFilteredCompaniesByType(type: string) {
        return this._companies.getValue().filter(company => company.type === type);
    }
    getFilteredCompaniesByName(name: string) {
        return this._companies.getValue().filter(company => company.name === name);
    }
    getFilteredCompaniesByIndustry(industry: string) {
        return this._companies.getValue().filter(company => company.industry === industry);
    }
    addCompanies(companies: any) {
        this.companies = companies;
    }
}