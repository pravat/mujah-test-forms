import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationDetailsComponent } from './components/organization-details/organization-details.component';
import { OrganizationAddressComponent } from './components/organization-address/organization-address.component';
import { OrganizationAddressesComponent } from './components/organization-addresses/organization-addresses.component';
import { FormserviceService } from './services/formservice.service';
@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot() ],
  declarations: [ AppComponent, HelloComponent, OrganizationDetailsComponent, OrganizationAddressComponent, OrganizationAddressesComponent ],
  bootstrap:    [ AppComponent ],
  providers: [FormserviceService]
})
export class AppModule { }
