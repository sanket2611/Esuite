export class ActionPlanList {
    id: number;
    job: string;
    description: string;
    responsible: string;
    addedBy: string;
    addedAt: Date;
    initialDueDate: Date;
    dueDate: Date;
    completionDate: Date;
    status: string;
    source: string;
    sourceId: number;
}