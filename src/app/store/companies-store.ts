import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICompany } from "../interfaces/ICompany";
import * as _ from "lodash";

@Injectable({providedIn: 'root'})
export class CompaniesStoreService {
    private readonly _companies = new BehaviorSubject<ICompany[]>([]);
    readonly companies$ = this._companies.asObservable();
    private readonly _companiesForView = new BehaviorSubject<ICompany[]>([]);
    readonly companiesForView$ = this._companiesForView.asObservable();
    private readonly _fetched = new BehaviorSubject<boolean>(false);
    readonly fetched$ = this._fetched.asObservable();
    private set companies(data: ICompany[]) {
        this._companies.next(data);
    }
    private set fetched(bool: boolean) {
        this._fetched.next(bool);
    }
    private set companiesForView(data: ICompany[]) {
        this._companiesForView.next(data);
    }

    getCompanies(){
        return this._companiesForView.getValue();
    }

    restoreCompanies() {
        this.companiesForView = this._companies.getValue();
    }

    getFilteredCompaniesByType(type: string | boolean) {
        if (type === 'Choose type of company') {
            this.companiesForView = this._companies.getValue();
            return;
        }
        this.companiesForView = this.getCompanies().filter(company => company.type === type);
    }
    getFilteredCompaniesByName(name: string) {
        if (name.trim() === '') {
            this.companiesForView = this._companies.getValue();
            return;
        }
        this.companiesForView = this.getCompanies().filter(company =>
            company.business_name.slice(0, name.length).toLocaleLowerCase() === name.toLocaleLowerCase()
        );
    }
    getFilteredCompaniesByIndustry(industry: string | boolean) {
        if (industry === 'Choose industry of company') {
            this.companiesForView = this._companies.getValue();
            return;
        }
        this.companiesForView = this.getCompanies().filter(company => company.industry === industry);
    }
    setCompanies(companies: any) {
        this.companies = companies;
        this.companiesForView = companies;
    }
    getTypes() {
        return _.union(this.getCompanies().map(company => company.type)).sort();
    }
    getIndustries() {
        return _.union(this.getCompanies().map(company => company.industry)).sort();
    }
    toogleFetched() {
        this.fetched = !this.fetched;
    }
}