import { Component, OnInit, forwardRef } from '@angular/core';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';
import { AbstractControl, FormGroup, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, Validators, NG_VALIDATORS, ValidationErrors, FormArray } from '@angular/forms';
import { OrganizationDetails } from '../../model/organizationdetails'
import { FormserviceService} from '../../services/formservice.service'
@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrganizationDetailsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OrganizationDetailsComponent),
      multi: true
    }
  ]
})
export class OrganizationDetailsComponent extends BaseControlValueAccessor<OrganizationDetails> implements ControlValueAccessor, OnInit {
  orgDetailsFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private formserviceService: FormserviceService,
    ) {
    super();
    this.orgDetailsFormGroup = formBuilder.group({
      legalName: ['',[Validators.required]],
      code: ['', [Validators.required]],
      displayName: [''],
      parentOrganization: [''],
      organizationAddresses: [[]]
    });
    this.orgDetailsFormGroup.valueChanges.subscribe(val => {
      this.value = val;
      this.onChange(val);
    });
  }

  ngOnInit() {
  }

  writeValue(orgDetails: OrganizationDetails) {
    console.log('test');
    this.value = orgDetails;
    this.orgDetailsFormGroup.patchValue(orgDetails);
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if(this.orgDetailsFormGroup.valid) {
      return null;
    } else {
      return this.formserviceService.getAllErrors(this.orgDetailsFormGroup);
    }    
  }
}