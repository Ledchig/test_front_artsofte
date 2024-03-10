import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent {
  id: any;
  constructor(private activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
