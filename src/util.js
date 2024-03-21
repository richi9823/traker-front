import { API_BASE_URL } from "./constants/apiConf";

  export function cloneObject(o) {
    return JSON.parse(JSON.stringify(o));
  }
  export function isUrl(s) {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
  }  
  export function getFileURL(fileId) {
    if (isUrl(fileId)) {
      return fileId;
    }
    return `${API_BASE_URL}/api/asset/${fileId}`;
  }  