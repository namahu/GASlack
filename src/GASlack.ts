import { IGASlack } from "./Interface/GASlack";

type SlackToken = string;

class GASlack implements IGASlack {
  readonly token: SlackToken;

  private readonly baseURL: string = "https://slack.com/api/";

  constructor(token: SlackToken) {
    this.token = token;
  }

  makeRequestOptions = <T>(
    method: GoogleAppsScript.URL_Fetch.HttpMethod,
    payload?: T
  ): GoogleAppsScript.URL_Fetch.URLFetchRequestOptions => {
    const option: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: method,
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      muteHttpExceptions: true,
    };

    if (payload) option.payload = JSON.stringify(payload);

    return option;
  };

  fetch = <T>(
    endPoint: string,
    options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {}
  ): T => {
    const url: string = `${this.baseURL}${endPoint}`;
    const res: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(
      url,
      options
    );
    return JSON.parse(res.getContentText());
  };
}
