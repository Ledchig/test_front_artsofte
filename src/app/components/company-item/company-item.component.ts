import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-item.component.html',
  styleUrl: './company-item.component.scss'
})
export class CompanyItemComponent {
  @Input() logo = '';
  @Input() name = '';
  @Input() type = '';
  @Input() industry = '';
  @Input() id = '';
}
