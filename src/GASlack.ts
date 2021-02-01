import SlackChatService_ from "./SlackAPI/ChatService/ChatService";

/**
 * Returns a GASlack instance.
 *
 * @param { string } slackToken - Slack user token or Slack bot token
 * @returns { GASlackService } - Instances of GASlack
 */
const getGASlackInstance = (slackToken: GASlack.SlackToken): GASlackService => {
  return new GASlackService(slackToken);
};

/**
 * A class that provides access to each Slack API.
 */
class GASlackService implements GASlack.IGASlack {
  private token: GASlack.SlackToken;
  private readonly baseURL: GASlack.SlackAPIBaseURL = "https://slack.com/api/";

  readonly Chat: GASlack.ChatService.Chat;

  constructor(token: GASlack.SlackToken) {
    this.token = token;
    this.Chat = new SlackChatService_(this);
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
