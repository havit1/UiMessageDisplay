import { Component, OnInit } from '@angular/core';
import { InputDataFormatterService } from '../shared/services/input-data-formatter.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent implements OnInit {
  constructor(private _inputDataFormatService: InputDataFormatterService) {}

  jsonData = '';

  handleSubmit() {
    this._inputDataFormatService.formatJson(this.jsonData);
    this.jsonData = '';
  }

  ngOnInit(): void {}
}
