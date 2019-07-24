import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeTypeService } from '../services/employee-type.service';

@Injectable()
export class EmployeeTypesResolve implements Resolve<any> {

    constructor(private employeeTypeService: EmployeeTypeService) { }

    resolve(route: ActivatedRouteSnapshot) {        
        return this.employeeTypeService.get();
    }
}