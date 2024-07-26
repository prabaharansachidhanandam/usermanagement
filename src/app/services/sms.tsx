import twilio from "twilio";

const sms = {
  sendOTP: async function (mobileNumber: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const service = client.verify.v2
      .services("VAe555aa2b839549085e979cffd98d9efd")
      .verifications.create({
        channel: "sms",
        to: mobileNumber,
      });
  },

  validateOTP: async function (otp: string, mobileNumber: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const service = await client.verify.v2
      .services("VAe555aa2b839549085e979cffd98d9efd")
      .verificationChecks.create({
        code: otp,
        to: mobileNumber,
      });
    return service.status;
  },
};

export default sms;
