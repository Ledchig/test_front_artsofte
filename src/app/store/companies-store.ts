import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICompany } from "../interfaces/ICompany";
import * as _ from "lodash";
import { AbstractControl } from "@angular/forms";

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

    filterCompanies(name: AbstractControl | null, type: AbstractControl | null, industry: AbstractControl | null) {
        this.companiesForView = this._companies.getValue();
        if (name && name.value.trim() !== '') {
            this.companiesForView = this.getCompanies().filter(company =>
                company.business_name.slice(0, name.value.length).toLocaleLowerCase() === name.value.toLocaleLowerCase()
            );
        } if (type && type.value !== 'Choose type of company' && type.value.trim() !== '') {
            this.companiesForView = this.getCompanies().filter(company => company.type.trim() === type.value);
        } if (industry && industry.value !== 'Choose industry of company' && industry.value !== '') {
            this.companiesForView = this.getCompanies().filter(company => company.industry === industry.value);
        }

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