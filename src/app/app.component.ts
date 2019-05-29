import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormserviceService } from './services/formservice.service'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
   private formService: FormserviceService
  ) {
    this.mainGroup = formBuilder.group({
      organizationDetails: [''],
      //organizationAddresses: [[]]
    });
    this.mainGroup.valueChanges.subscribe(v=>{
      console.log(v); 
    });
  }

  fillForm() {
    this.mainGroup.patchValue({
      organizationDetails: {
        legalName: "abcddd",
        code: "",
        displayName: "",
        parentOrganization: "",
        organizationAddresses: [
          {
            "address1": "Toronto",
            "address2": "suite 815",
            "city": "North York",
            "country": 1,
            "province": 2,
            "postalCode": ""
          },
          {
            "address1": "Some address",
            "address2": "suite 5",
            "city": "Toronto",
            "country": 1,
            "province": 2,
            "postalCode": ""
          }
        ]
      }
    });
  }
}
