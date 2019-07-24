export class PlantSearchRequest {
    public delegationId?: number;
    public countryId?: number;
    public sectorId?: number;
    public businessUnitId?: number;
    public soaId?: number;
    
    constructor(request?: PlantSearchRequest) {
        if(request){
            this.delegationId = request.delegationId;
            this.countryId = request.countryId;
            this.sectorId = request.sectorId;
            this.businessUnitId = request.businessUnitId;
            this.soaId = request.soaId;
        }        
    }
}