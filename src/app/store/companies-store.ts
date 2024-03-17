import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICompany } from "../interfaces/ICompany";
import { AbstractControl } from "@angular/forms";

interface IFilterParams {
    name: AbstractControl | null;
    type: AbstractControl | null;
    industry: AbstractControl | null;
}

@Injectable({ providedIn: 'root' })
export class CompaniesStoreService {
    private readonly _companies = new BehaviorSubject<ICompany[]>([]);
    readonly companies$ = this._companies.asObservable();
    private readonly _companiesForView = new BehaviorSubject<ICompany[]>([]);
    readonly companiesForView$ = this._companiesForView.asObservable();
    private readonly _fetched = new BehaviorSubject<boolean>(false);
    readonly fetched$ = this._fetched.asObservable();
    private readonly _filterParams = new BehaviorSubject<IFilterParams>({} as IFilterParams);
    readonly filterParams$ = this._filterParams.asObservable();
    private readonly _sortParam = new BehaviorSubject<string | null>(null);
    readonly sortParam$ = this._sortParam.asObservable();

    private set filterParams(params: IFilterParams) {
        this._filterParams.next(params);
    }
    private set sortParam(param: string | null) {
        this._sortParam.next(param);
    }
    private set companies(data: ICompany[]) {
        this._companies.next(data);
    }
    private set fetched(bool: boolean) {
        this._fetched.next(bool);
    }
    private set companiesForView(data: ICompany[]) {
        this._companiesForView.next(data);
    }

    getCompanies() {
        return this._companiesForView.getValue();
    }

    setFilterParams(params: IFilterParams) {
        this.filterParams = params;
    }

    filterCompanies() {
        this.companiesForView = this._companies.getValue();
        const { name, type, industry } = this._filterParams.getValue();
        if (name && name.value.trim() !== '') {
            this.companiesForView = this.getCompanies().filter(company =>
                company.business_name.slice(0, name.value.length).toLocaleLowerCase() === name.value.toLocaleLowerCase()
            );
        } if (type && type.value !== 'Choose type of company' && type.value.trim() !== '') {
            this.companiesForView = this.getCompanies().filter(company => company.type.trim() === type.value);
        } if (industry && industry.value !== 'Choose industry of company' && industry.value !== '') {
            this.companiesForView = this.getCompanies().filter(company => company.industry === industry.value);
        } if (this._sortParam.getValue() !== '') {
            this.sort()
        };
    }

    setSortParam(param: string | null) {
        this.sortParam = param;
    }

    sort() {
        const companies = [...this.getCompanies()];
        switch (this._sortParam.getValue()) {
            case 'name':
                this.companiesForView = [...companies.sort((a, b) => a.business_name.localeCompare(b.business_name))];
                break;
            case 'type':
                this.companiesForView = [...companies.sort((a, b) => a.type.localeCompare(b.type))];
                break;
            case 'industry':
                this.companiesForView = [...companies.sort((a, b) => a.industry.localeCompare(b.industry))];
                break;
            default:
                this.companiesForView = this._companies.getValue();
                this.filterCompanies();
                break;
        }
    }

    setCompanies(companies: any) {
        this.companies = companies;
        this.companiesForView = companies;
    }
    getTypes() {
        return Array.from(new Set((this.getCompanies().map(company => company.type)).sort()));
    }
    getIndustries() {
        return Array.from(new Set((this.getCompanies().map(company => company.industry)).sort()));
    }
    toogleFetched() {
        this.fetched = !this.fetched;
    }
}