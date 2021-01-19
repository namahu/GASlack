export interface IGASlack {
  makeRequestOptions: <T>(
    method: GoogleAppsScript.URL_Fetch.HttpMethod,
    payload?: T
  ) => GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

  fetch: <T>(
    endpoint: string,
    options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  ) => T;
}
