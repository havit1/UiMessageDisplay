import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { UserInputComponent } from './user-input/user-input.component';
import { DagComponent } from './dag/dag.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [AppComponent, TableComponent, UserInputComponent, DagComponent, MessageComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
