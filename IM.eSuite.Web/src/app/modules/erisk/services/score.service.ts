import { Injectable } from '@angular/core';
import { AbstractDataService } from '@im-angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChronicRiskScoreList } from '../models/chronic-risk-score-list.model';

@Injectable()
export class ScoreService extends AbstractDataService {
    private readonly baseUrl = `${environment.eRiskApi.endpoint}/api/ChronicRiskScore`;

    constructor(private httpClient: HttpClient) {
        super();
    }

    /**
    * List of score fo Chronique risk
    * Returns {Observable<Array<FrequencyList>>}
    */
    list(): Observable<Array<ChronicRiskScoreList>> {
        let url = `${this.baseUrl}`;
        return this.httpClient.get<Array<ChronicRiskScoreList>>(`${url}`);
    }

    computeScore(probabilityRate: number, severityRate: number, frequencyRate: number): number {
        let score: number;

        probabilityRate = (probabilityRate) ? probabilityRate : 1;
        severityRate = (severityRate) ? severityRate : 1;
        frequencyRate = (frequencyRate) ? frequencyRate : 1;

        score = probabilityRate * severityRate * frequencyRate;

        return this.roundScore(score);
    }

    roundScore(score: number): number {
        let roundScore: number;
        switch (true) {
            case score > 0 && score < 8:
                roundScore = 2;
                break;
            case score >= 8 && score < 12:
                roundScore = 8;
                break;
            case score >= 12 && score < 16:
                roundScore = 12;
                break;
            case score >= 16 && score < 20:
                roundScore = 16;
                break;
            case score >= 20 && score < 21:
                roundScore = 20;
                break;
            case score >= 21 && score < 32:
                roundScore = 21;
                break;
            case score >= 32 && score < 40:
                roundScore = 32;
                break;
            case score >= 40 && score < 48:
                roundScore = 40;
                break;
            case score >= 48 && score < 64:
                roundScore = 48;
                break;
            case score >= 64 && score < 80:
                roundScore = 64;
                break;
            case score >= 80 && score < 84:
                roundScore = 80;
                break;
            case score >= 84 && score < 100:
                roundScore = 84;
                break;
            case score >= 100 && score < 126:
                roundScore = 100;
                break;
            case score >= 126 && score < 160:
                roundScore = 126;
                break;
            case score >= 160 && score < 168:
                roundScore = 160;
                break;
            case score >= 168 && score < 210:
                roundScore = 168;
                break;
            case score >= 210 && score < 240:
                roundScore = 210;
                break;
            case score >= 240 && score < 320:
                roundScore = 240;
                break;
            case score >= 320 && score < 400:
                roundScore = 320;
                break;
            case score >= 400 && score < 600:
                roundScore = 400;
                break;
            case score >= 600 && score < 800:
                roundScore = 600;
                break;
            case score >= 800 && score < 1000:
                roundScore = 800;
                break;
            case score >= 1000:
                roundScore = 1000;
                break;
        }
        return roundScore;
    }
}