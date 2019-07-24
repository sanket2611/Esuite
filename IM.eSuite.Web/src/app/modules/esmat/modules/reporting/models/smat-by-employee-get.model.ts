import { SmatByMonthGet } from "./smat-by-month-get.model";

export class SmatByEmployeeGet {
    public name: number;    
    public smatsByMonth: SmatByMonthGet[];
    public total: number;
}