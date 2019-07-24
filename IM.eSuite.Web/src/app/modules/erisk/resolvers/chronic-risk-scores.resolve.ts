import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ScoreService } from '../services/score.service';


@Injectable()
export class ChronicRiskScoresResolve implements Resolve<any> {

    constructor(private scoreService: ScoreService) { }

    resolve() {
        return this.scoreService.list();
    }
}