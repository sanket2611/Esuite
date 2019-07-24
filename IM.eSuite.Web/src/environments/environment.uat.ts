// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  eSuiteApi : {
    endpoint : "http://api-esuite-uat.im.saint-gobain.com"
  },
  eSmatApi : {
    endpoint : "http://api-esmat-uat.im.saint-gobain.com"
  },
  eRiskApi : {
    endpoint : "http://api-erisk-uat.im.saint-gobain.com"
  },
  eActionApi : {
    endpoint : "https://lan-test-im.api.saint-gobain.com/eAction-uat",
    keyId:{    
      eAction: "6a6311ec-9acb-4282-b95a-d5af68829702",
      eSmat: "7cf2a58c-5b1d-4abc-9602-5771a26b2189",
      eRisk: "0996359f-e700-4d48-8343-7f4e73327f0e"
    }
  },
  oAuth:{
    loginUrl: "https://uat.cloudgateway.saint-gobain.com/openam/oauth2/AccessManagement/authorize",
    responseType: "code",
    clientId: "IM_eSuite_UAT",
    redirectUri: "http://esuite-uat.im.saint-gobain.com/signin-websso",
    refreshTokenClockSkew: 60000,
    returnUrl: "home",
    realm: null,
    logoutUrl : 'https://uat.cloudgateway.saint-gobain.com/openam/XUI/?realm=/AccessManagement#logout/'
  },
  translation: {
    languages: ["en", "fr", "fi", "pl", "de", "es", "it", "ko", "zh", "pt", "ru", "cs", "ro"],
    defaultLanguage: "en"
  }
};
