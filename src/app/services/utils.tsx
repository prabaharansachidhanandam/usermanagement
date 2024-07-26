import { JSEncrypt } from "jsencrypt";
import config from "./constants";

const jsEncrypt = new JSEncrypt();

const utils = {
  encrypt: function (data: string) {
    jsEncrypt.setPublicKey(config.publicKey);
    const encrypted = jsEncrypt.encrypt(data);
    return encrypted;
  },
  decrypt: function (encrypted: string) {
    jsEncrypt.setPrivateKey(config.privateKey);
    const decrypted = jsEncrypt.decrypt(encrypted) as string;
    const json = JSON.parse(decrypted);
    return json;
  },
};

export default utils;
