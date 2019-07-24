export const environment = {
  production: true,
  eSuiteApi : {
    endpoint : "https://api-esuite.im.saint-gobain.com"
  },
  eSmatApi : {
    endpoint : "https://api-esmat.im.saint-gobain.com"
  },
  eRiskApi : {
    endpoint : "https://api-erisk.im.saint-gobain.com"
  },
  eActionApi : {
    endpoint : "https://api-eaction.im.saint-gobain.com",
    keyId:{    
      eAction: "6a5cf643-33c1-464c-9241-f9b0821f3e8d",
      eSmat: "fdefaddc-993a-4937-b21e-9c27c3c19389",
      eRisk: "dd2ba49d-ffb6-44b8-9e73-e6531efcbf19"
    }
  },
  oAuth:{
    loginUrl: "https://cloudsso.saint-gobain.com/openam/oauth2/authorize",
    responseType: "code",
    clientId: "IM_eSuite",
    redirectUri: "https://esuite.im.saint-gobain.com/signin-websso",
    refreshTokenClockSkew: 60000,
    returnUrl: "home",
    realm: "AccessManagement",
    logoutUrl : 'https://cloudsso.saint-gobain.com/openam/XUI/?realm=/AccessManagement#logout/'
  },
  translation: {
    languages: ["en", "fr", "fi", "pl", "de", "es", "it", "ko", "zh", "pt", "ru", "cs", "ro"],
    defaultLanguage: "en"
  }
};