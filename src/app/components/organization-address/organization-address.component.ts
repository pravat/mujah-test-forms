import { Component, OnInit, forwardRef } from '@angular/core';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';
import { FormGroup, FormArray, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, Validators, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Address } from '../../model/address'

@Component({
  selector: 'app-organization-address',
  templateUrl: './organization-address.component.html',
  styleUrls: ['./organization-address.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrganizationAddressComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OrganizationAddressComponent),
      multi: true
    }
  ]
})
export class OrganizationAddressComponent extends BaseControlValueAccessor<Address> implements OnInit {
  addressFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    super();
    this.addressFormGroup = formBuilder.group({
      address1: ['', [Validators.required]],
      address2: [''],
      city: [''],
      country: [''],
      province: [''],
      postalCode: ['']
    });
    this.addressFormGroup.valueChanges.subscribe(val=> {
      this.value = val;
      this.onChange(val);
    });
  }

  ngOnInit() {

  }

  writeValue(address: Address) {
    this.value = address;
    this.addressFormGroup.patchValue(address);
  }

   validate(c: AbstractControl): ValidationErrors | null{
    console.log("ADress validation");
    return this.addressFormGroup.valid ? null : { invalidForm: {valid: false, message: "Address fields are invalid"}};
  }
}