import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SignupComponent,
    CreateTicketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,RouterModule,
    CoreModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ]
})
export class FeaturesModule { }
