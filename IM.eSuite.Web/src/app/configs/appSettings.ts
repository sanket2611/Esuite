export const APPSETTINGS = {
    PAGE_SIZE: {
        SIZES: [5, 10, 50],
        DEFAULT_SIZE: 10
    },
    TRANSLATIONS_FOLDER_PATH: "./assets/i18n/",
    SIDEBARS: {
        ESUITE:[
            { iconClassName: "fa fa-th" , label: "Home.Applications", role: "eSuite_Application_Read", link: "/home", subItems: null },
            { iconClassName: "fa fa-industry" , label: "Organization.Organization", role: "eSuite_MasterData_Organization_Write", link: "/organizations", subItems: null },
            { iconClassName: "fa fa-user" , label: "Administration.Users.Users", role: "eSuite_Administration_User_Write", link: "/users", subItems: null }                       
        ],
        ESMAT:[
            { iconClassName: "fa fa-dashboard" , label: "eSMAT.Title", role: "eSmat_Schedule_Read", link: "/e-smat", subItems: null },
            { iconClassName: "fa fa-history" , label: "eSMAT.History", role: "eSmat_Schedule_Read", link: "/e-smat/history", subItems: null },
            { iconClassName: "fa fa-area-chart" , label: "eSMAT.Reporting.SubTitle", role: "eSmat_Reporting_Read", link: "/e-smat/reporting", subItems: null },
            { iconClassName: "fa fa-list-ul" , label: "eAction.SubTitle", role: "eAction_Action_Read", link: "/e-action/eSMAT", subItems: null },
            { iconClassName: "fa fa-th" , label: "Home.MasterData", role: null, link: null, subItems: [
                { iconClassName: "fa fa-user" , label: "eSMAT.SmatReceivers", role: "eSmat_MasterData_Smatee_Manage", link: "/e-smat/master-data/smat-receiver", subItems: null },
                { iconClassName: "fa fa-list" , label: "eSMAT.Observations", role: "eSmat_MasterData_ObservationCategory_Write", link: "/e-smat/master-data/observation", subItems: null }
            ]},
            { iconClassName: "fa fa-home" , label: "Home.BackMenu", role: null, link: "/home", subItems: null }
        ],
        ERISK:[
            { iconClassName: "fa fa-dashboard" , label: "eRisk.ConsolidationTitle", role: null, link: "/e-risk", subItems: null },
            { iconClassName: "fa fa-bomb" , label: "eRisk.RiskEvaluationTitle", role: null, link: "/e-risk/assessment", subItems: null},
            { iconClassName: "fa fa-th" , label: "Home.MasterData", role: null, link: null, subItems: [
                { iconClassName: "fa fa-bolt" , label: "eRisk.Hazards", role: "eRisk_MasterData_Hazard_Write", link: "/e-risk/master-data/hazard", subItems: null },
                { iconClassName: "fa fa-male" , label: "eRisk.EPI", role: "eRisk_MasterData_Epi_Write", link: "/e-risk/master-data/epi", subItems: null }
            ]},
            { iconClassName: "fa fa-area-chart" , label: "eRisk.Reporting.SubTitle", role: "eRisk_Reporting_Read", link: "/e-risk/reporting", subItems: null },
            { iconClassName: "fa fa-home" , label: "Home.BackMenu", role: null, link: "/home", subItems: null }
        ],
        EACTION:[
            { iconClassName: "fa fa-list-ul" , label: "eAction.SubTitle", role: "eAction_Action_Read", link: "/e-action", subItems: null },
            { iconClassName: "fa fa-home" , label: "Home.BackMenu", role: "eSuite_Application_Read", link: "/home", subItems: null }          
        ]
    },
    TOASTR: {
        timeOut: 2000
    }
}