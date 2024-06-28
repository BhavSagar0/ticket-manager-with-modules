import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NthElementPipe } from './pipes/nth-element.pipe';



@NgModule({
  declarations: [
    NthElementPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NthElementPipe
  ]
})
export class SharedModule { }
