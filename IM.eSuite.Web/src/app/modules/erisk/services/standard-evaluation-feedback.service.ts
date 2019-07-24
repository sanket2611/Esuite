import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractDataService } from '@im-angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { StandardEvaluationFeedbackList } from '../models/standard-evaluation-feedback-list.model';

@Injectable()
export class StandardEvaluationFeedbackService extends AbstractDataService{

  private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/StandardEvaluationFeedback`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  /**
  * List StandardEvaluationFeedbacks
  * Returns {Observable<StandardEvaluationFeedbackList[]>} 
  */
  get(): Observable<StandardEvaluationFeedbackList[]>{
    let url = `${this.baseUrl}`;
    return this.httpClient.get<StandardEvaluationFeedbackList[]>(url);
  }

}