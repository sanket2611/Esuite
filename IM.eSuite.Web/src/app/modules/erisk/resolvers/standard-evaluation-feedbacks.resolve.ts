import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StandardEvaluationFeedbackService } from '../services/standard-evaluation-feedback.service';

@Injectable()
export class StandardEvaluationFeedbacksResolve implements Resolve<any> {

    constructor(private standardEvaluationFeedbackService:StandardEvaluationFeedbackService) { }

    resolve() {   
        return this.standardEvaluationFeedbackService.get();     
    }
}