import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FrequencyService } from '../services/frequency.service';

@Injectable()
export class FrequenciesResolve implements Resolve<any> {

    constructor(private frequencyService: FrequencyService) { }

    resolve() {
        return this.frequencyService.list();
    }
}
