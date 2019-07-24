import { EpiMeanOfControlViewModel } from './EpiMeanOfControl.viewModel';
import { OrganizationMeanOfControlViewModel } from './organizationMeanOfControl.viewModel';
import { TechnicalMeanOfControlViewModel } from './technicalMeanOfControl.viewModel';
import { RiskGet } from '../models/risk-get.model';

export class RiskControlViewModel {
    public epis: EpiMeanOfControlViewModel;
    public organizations : OrganizationMeanOfControlViewModel;
    public technicalMeasures : TechnicalMeanOfControlViewModel;

    public static fromRiskGet(risk: RiskGet): RiskControlViewModel {
        let result = new RiskControlViewModel();
        result.technicalMeasures = TechnicalMeanOfControlViewModel.fromRiskGet(risk);
        result.organizations = OrganizationMeanOfControlViewModel.fromRiskGet(risk);
        result.epis = EpiMeanOfControlViewModel.fromRiskGet(risk);
        return result;
    }
}
