namespace IM.eSuite.Domain
{
    public static class UserRole
    {
        public const string eSuite_Administration_User_Read = "eSuite_Administration_User_Read";
        public const string eSuite_Administration_User_Write = "eSuite_Administration_User_Write";
        public const string eSuite_Administration_UserGroup_Read = "eSuite_Administration_UserGroup_Read";
        public const string eSuite_MasterData_Organization_Read = "eSuite_MasterData_Organization_Read";
        public const string eSuite_MasterData_Organization_Write = "eSuite_MasterData_Organization_Write";
        public const string eSuite_MasterData_Delegation_Read = "eSuite_MasterData_Delegation_Read";
        public const string eSuite_MasterData_Country_Read = "eSuite_MasterData_Country_Read";
        public const string eSuite_MasterData_Sector_Read = "eSuite_MasterData_Sector_Read";
        public const string eSuite_MasterData_BusinessUnit_Read = "eSuite_MasterData_BusinessUnit_Read";
        public const string eSuite_MasterData_SOA_Read = "eSuite_MasterData_SOA_Read";
        public const string eSuite_MasterData_Plant_Read = "eSuite_MasterData_Plant_Read";
        public const string eSuite_MasterData_Plant_Write = "eSuite_MasterData_Plant_Write";
        public const string eSuite_Application_Read = "eSuite_Application_Read";

        public const string eSmat_Schedule_Read = "eSmat_Schedule_Read";
        public const string eSmat_Schedule_Write = "eSmat_Schedule_Write";
        public const string eSmat_MasterData_EmployeeType_Read = "eSmat_MasterData_EmployeeType_Read";
        public const string eSmat_MasterData_Smatee_Read = "eSmat_MasterData_Smatee_Read";
        public const string eSmat_MasterData_Smatee_Write = "eSmat_MasterData_Smatee_Write";
        public const string eSmat_MasterData_Smatee_Manage = "eSmat_MasterData_Smatee_Manage";
        public const string eSmat_MasterData_ObservationType_Read = "eSmat_MasterData_ObservationType_Read";
        public const string eSmat_MasterData_ObservationCategory_Read = "eSmat_MasterData_ObservationCategory_Read";
        public const string eSmat_MasterData_ObservationCategory_Write = "eSmat_MasterData_ObservationCategory_Write";
        public const string eSmat_MasterData_ObservationSubCategory_Read = "eSmat_MasterData_ObservationSubCategory_Read";
        public const string eSmat_MasterData_ObservationSubCategory_Write = "eSmat_MasterData_ObservationSubCategory_Write";
        public const string eSmat_MasterData_Shift_Read = "eSmat_MasterData_Shift_Read";
        public const string eSmat_Smat_Read = "eSmat_Smat_Read";
        public const string eSmat_Smat_Write = "eSmat_Smat_Write";
        public const string eSmat_Reporting_Read = "eSmat_Reporting_Read";

        public const string eAction_Action_Read = "eAction_Action_Read";
        public const string eAction_Action_Write = "eAction_Action_Write";
        public const string eAction_Is_ActionResponsible = "eAction_Is_ActionResponsible";
        public const string eAction_Category_Read = "eAction_Category_Read";
        public const string eAction_SubCategory_Read = "eAction_SubCategory_Read";

        public const string eRisk_Risk_Read = "eRisk_Risk_Read";
        public const string eRisk_Risk_Write = "eRisk_Risk_Write";
        public const string eRisk_MasterData_Hazard_Read = "eRisk_MasterData_Hazard_Read";
        public const string eRisk_MasterData_Hazard_Write = "eRisk_MasterData_Hazard_Write";
        public const string eRisk_MasterData_Probability_Read = "eRisk_MasterData_Probability_Read";
        public const string eRisk_MasterData_Epi_Read = "eRisk_MasterData_Epi_Read";
        public const string eRisk_MasterData_Epi_Write = "eRisk_MasterData_Epi_Write";
        public const string eRisk_MasterData_MeanOfControl_Read = "eRisk_MasterData_MeanOfControl_Read";
        public const string eRisk_MasterData_MeanOfControl_Write = "eRisk_MasterData_MeanOfControl_Write";
        public const string eRisk_MasterData_Severity_Read = "eRisk_MasterData_Severity_Read";
        public const string eRisk_MasterData_Frequency_Read = "eRisk_MasterData_Frequency_Read";
        public const string eRisk_Consolidation_Read = "eRisk_Consolidation_Read";
        public const string eRisk_SafetySheet_Read = "eRisk_SafetySheet_Read";
        public const string eRisk_Reporting_Read = "eRisk_Reporting_Read";
        
        /// <summary>
        /// The User with eRisk_Owner_Risk claim should only see the risks he created
        /// </summary>
        public const string eRisk_Owner_Risk = "eRisk_Owner_Risk";
    }
}