import { Component, OnInit } from '@angular/core';
import { InputDataFormatterServiceService } from '../input-data-formatter-service.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent implements OnInit {
  constructor(
    private _inputDataFormatService: InputDataFormatterServiceService
  ) {}

  jsonData = '';

  handleSubmit() {
    this._inputDataFormatService.formatJson(JSON.parse(this.jsonData));
  }

  ngOnInit(): void {}
}
