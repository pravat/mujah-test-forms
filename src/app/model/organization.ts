import {OrganizationDetails} from './organizationdetails';
import {Address} from './address';
export interface Organization {
  organizationDetail: OrganizationDetails;
  addresses: Address[];
}