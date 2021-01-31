import { SlackChatService } from "./SlackAPI/ChatService/ChatService";

const getGASlackInstance = (slackToken: GASlack.SlackToken): GASlack => {
  return new GASlack(slackToken);
};

class GASlack implements GASlack.IGASlack {
  private token: GASlack.SlackToken;
  private readonly baseURL: GASlack.SlackAPIBaseURL = "https://slack.com/api/";

  readonly Chat: SlackChatService = new SlackChatService(this);

  constructor(token: GASlack.SlackToken) {
    this.token = token;
  }

  makeRequestOptions = <T>(
    method: GASlack.Request.HttpMethod,
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
