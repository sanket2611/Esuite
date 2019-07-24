import { ObservationTypeEnum } from "../enums/observation-type.enum";
import { ObservationSave } from "../models/observation-save.model";
import { ObservationGet } from "../models/observation-get.model";
import { ActionViewModel } from "./action.viewModel";

export class ObservationViewModel {    
    public id: number;
    public type: ObservationTypeEnum;
    public smateeId: number;
    public categoryId: number;
    public subCategoryId: number;
    public comment: string;
    public isImmediateAction: boolean;
    public isTf4Tf5: boolean;
    public hasImage: boolean;
    public actionPlanId: number;
    public actionPlan: ActionViewModel;

    constructor(type?: ObservationTypeEnum){
        if(type){
            this.type = type;
        }
    }

    public toObservationSave(): ObservationSave {
        let observation = new ObservationSave();
        if(this.id){
            observation.id = this.id;
        }        
        observation.typeId = this.type;
        observation.smateeId = this.smateeId;
        observation.categoryId = this.categoryId;
        observation.subCategoryId = this.subCategoryId;
        observation.comment = this.comment;
        observation.isImmediateAction = this.isImmediateAction;
        observation.isTf4Tf5 = this.isTf4Tf5;
        return observation;
    }

    public static fromObservationGet(observation: ObservationGet): ObservationViewModel{
        let result = new ObservationViewModel();
        if(observation){
            result.id = observation.id;
            result.categoryId = observation.categoryId;
            result.comment = observation.comment;
            result.isImmediateAction = observation.isImmediateAction;
            result.isTf4Tf5 = observation.isTf4Tf5;
            result.hasImage = observation.hasImage;
            result.smateeId = observation.smateeId;
            result.subCategoryId = observation.subCategoryId;
            result.type = observation.type;
            result.actionPlanId = observation.actionPlanId;           
        }
        return result;
    }
}