import { LocationViewModel } from '../../eaction/viewModels/location.viewModel';
import { SelectItem } from '@im-angular/core';
import { RiskGet } from '../models/risk-get.model';
import { LocationSave } from '../../eaction/models/location-save.model';
import { LocationGet } from '../../eaction/models/location-get.model';
import { RiskHistoryViewModel } from './risk-history.viewModel';
import { RiskHistoryGet } from '../models/risk-history-get.model';
import { Injector } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { UserViewModel } from './user.viewModel';

export class InformationViewModel {
    public location: LocationViewModel;
    public jobDescription: string;
    public addedAt: Date;
    public otherRiskSource: string;
    public standardEvaluationFeedbacks: SelectItem[] = new Array<SelectItem>();
    public riskSources: SelectItem[] = new Array<SelectItem>();
    public epis: SelectItem[] = new Array<SelectItem>();
    public riskHistories: RiskHistoryViewModel[] = new Array<RiskHistoryViewModel>();

    public static fromRiskGet(risk: RiskGet): InformationViewModel {
        let result = new InformationViewModel();

        result.jobDescription = risk.jobDescription;
        result.otherRiskSource = risk.otherRiskSource;
        result.riskHistories = risk.riskHistories.map(rh => InformationViewModel.fromRiskHistoryGet(rh));
        result.location = InformationViewModel.fromLocationGet(risk.location);
        result.epis = risk.minimumJobEpiIds.map(id => Object.assign(new SelectItem(), { id: id }));
        result.riskSources = risk.riskSourceIds.map(id => Object.assign(new SelectItem(), { id: id }));
        result.standardEvaluationFeedbacks = risk.standardEvaluationFeedbackIds.map(id => Object.assign(new SelectItem(), { id: id }));
        result.addedAt = risk.addedAt;
        return result;
    }

    public static toLocationSave(location): LocationSave {
        let locationResult = new LocationSave();
        locationResult.plantId = location.plantId;
        locationResult.departmentId = location.departmentId;
        locationResult.workshopId = location.workshopId;
        locationResult.jobId = location.jobId;
        locationResult.workstationId = location.workstationId;
        locationResult.taskId = location.taskId;
        return locationResult;
    }

    public static toLocationGet(location): LocationViewModel {
        let locationResult = new LocationGet();
        locationResult.plantId = location.plantId;
        locationResult.departmentId = location.departmentId;
        locationResult.workshopId = location.workshopId;
        locationResult.jobId = location.jobId;
        locationResult.workstationId = location.workstationId;
        locationResult.taskId = location.taskId;
        return locationResult;
    }

    public static fromLocationGet(location): LocationViewModel {
        let locationResult = new LocationViewModel();
        locationResult.plantId = location.plantId;
        locationResult.departmentId = location.departmentId;
        locationResult.workshopId = location.workshopId;
        locationResult.jobId = location.jobId;
        locationResult.workstationId = location.workstationId;
        locationResult.taskId = location.taskId;
        return locationResult;
    }

    public static fromRiskHistoryGet(riskHistory: RiskHistoryGet): RiskHistoryViewModel {
        let riskHistoryResult = new RiskHistoryViewModel();
        riskHistoryResult.description = riskHistory.hazardDescription;
        riskHistoryResult.previousScore = this.getScore(riskHistory);
        riskHistoryResult.lastUpdate = riskHistory.addedAt;
        if (riskHistory.user) {
            riskHistoryResult.user = new UserViewModel(riskHistory.user.firstName, riskHistory.user.lastName);
        }
        return riskHistoryResult;
    }

    private static getScore(riskHistory: RiskHistoryGet): number {
        if (riskHistory.withMeansOfControlScore.chronicRiskScore) {
            return riskHistory.withMeansOfControlScore.chronicRiskScore.score;
        }
        else {
            let injector = Injector.create([{ provide: ScoreService, useClass: ScoreService, deps: [] }]);
            let scoreService = injector.get(ScoreService);

            let probabilityRate: number;
            let severityRate: number;
            let frequencyRate: number;

            if (riskHistory.withMeansOfControlScore.probability)
                probabilityRate = riskHistory.withMeansOfControlScore.probability.rate;
            if (riskHistory.withMeansOfControlScore.severity)
                severityRate = riskHistory.withMeansOfControlScore.severity.rate;
            if (riskHistory.withMeansOfControlScore.frequency)
                frequencyRate = riskHistory.withMeansOfControlScore.frequency.rate;

            return scoreService.computeScore(probabilityRate, severityRate, frequencyRate);
        }
    }
}
