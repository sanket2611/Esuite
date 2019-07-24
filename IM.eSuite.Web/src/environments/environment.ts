// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  eSuiteApi : {
    endpoint : "http://localhost:5000"
  },  
  eSmatApi : {
    endpoint : "http://localhost:5001"
  },
  eRiskApi : {
    endpoint : "http://localhost:5002"
  },
  eActionApi : {
    endpoint : "http://localhost:5003",
    keyId:{
      eAction: "2d98b9ec-5934-45f6-827d-18abacd5d516",
      eSmat: "faa95a9e-f789-443d-8def-ae84253e8646",
      eRisk: "1632296a-ce1e-4d5d-8869-42a8ae879da2",   
    }
  },
  oAuth:{
    loginUrl: "https://cloudsso.saint-gobain.com/openam/oauth2/authorize",    
    responseType: "code",
    clientId: "IM_eSuite_Local",
    redirectUri: "http://localhost:4200/signin-websso",
    refreshTokenClockSkew: 60000,
    returnUrl: "home",
    realm: null,
    logoutUrl : 'https://cloudsso.saint-gobain.com/openam/XUI/?realm=/AccessManagement#logout/'
  },
  translation: {
    languages: ["en", "fr", "fi", "pl", "de", "es", "it", "ko", "zh", "pt", "ru", "cs", "ro"],
    defaultLanguage: "en"
  }
}