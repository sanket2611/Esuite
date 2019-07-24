import { ConsolidationAggregate } from "./consolidation-aggregate.model";

export class ConsolidationList {
    public lastEvaluationDate: Date;
    public department: string;
    public workshop: string;
    public job: string;
    public jobId: number;
    public critical = new ConsolidationAggregate();
    public high = new ConsolidationAggregate();
    public medium = new ConsolidationAggregate();
    public low = new ConsolidationAggregate();
}