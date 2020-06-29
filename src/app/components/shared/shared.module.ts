import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from 'src/app/directives/dropdown.directive';

import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SpinnerComponent,
    AlertComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    SpinnerComponent,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule { }
