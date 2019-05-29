import { Component, OnInit, forwardRef } from '@angular/core';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';
import { AbstractControl, FormGroup, FormArray, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, Validators, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Address } from '../../model/address'

@Component({
  selector: 'app-organization-addresses',
  templateUrl: './organization-addresses.component.html',
  styleUrls: ['./organization-addresses.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrganizationAddressesComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OrganizationAddressesComponent),
      multi: true
    }
  ]
})
export class OrganizationAddressesComponent extends BaseControlValueAccessor<Address[]> implements OnInit {
  addressesGroup: FormGroup;
  get addressesArr(): FormArray { return this.addressesGroup.get('addresses') as FormArray; }
  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
    this.addressesGroup = formBuilder.group({
      addresses: formBuilder.array([])
    });
    this.addressesGroup.valueChanges.subscribe(val => {
      this.onChange(val);
      this.value = val.addresses
    })
  }

  writeValue(addresses: Address[]) {
    // console.log(addresses);
    super.writeValue(addresses);
    while (this.addressesArr.length > 0) {
      this.addressesArr.removeAt(0);
    }
    addresses.forEach(address => {
      this.addressesArr.push(this.formBuilder.control(address));
    });
  }

  newAddress() {
    this.writeValue(
      this.value.concat({
        address1: '',
        address2: '',
        city: '',
        country: 1,
        province: 2,
        postalCode: ''
      }));
  }

  deleteAddress(index: number) {
    this.addressesArr.removeAt(index);
  }

  ngOnInit() {
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if(this.addressesGroup.valid) {
      return null;
    } else {
      return { 'address': true };
    }  
  }

}