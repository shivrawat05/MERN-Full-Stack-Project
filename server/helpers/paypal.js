const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "ASFWHt_Zi-bPIRiOC9T4izJe1Abdkf44DV2CA1iX1jlPPNPH9ZArk4mDBkmlcrU_GKZ93zby9PFgB2v2",
  client_secret:
    "EINWRuS2DciAIWwKZFCuwSANfsaty10H_EAhhuDopufBz6Hh2JOHoX-Yaj6qnkCfYO76M-CYA0EKXD3U",
});

module.exports = paypal;
