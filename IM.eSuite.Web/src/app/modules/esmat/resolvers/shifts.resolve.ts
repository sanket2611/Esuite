import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Shift } from '../models/shift.model';
import { ShiftService } from '../services/shift.service';

@Injectable()
export class ShiftsResolve implements Resolve<Shift[]> {

    constructor(private shiftService: ShiftService) { }

    resolve() {        
        return this.shiftService.get();
    }
}