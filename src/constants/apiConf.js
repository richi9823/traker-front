export const TrakerApi = require('TrakerApi');
export const API_BASE_URL = "https://200.234.235.51:8080";
const defaultClient = TrakerApi.ApiClient.instance;
defaultClient.timeout = 500000;
// Configure API URL
defaultClient.basePath = API_BASE_URL;
// Enable cookies
defaultClient.enableCookies = true;
