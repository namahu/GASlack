import SlackChatService_ from "./SlackAPI/ChatService/ChatService";
import SlackConversationService_ from "./SlackAPI/ConversationService/ConversationService";

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

  readonly Conversations: GASlack.ConversationsService.Conversations;
  readonly Chat: GASlack.ChatService.Chat;

  constructor(token: GASlack.SlackToken) {
    this.token = token;
    this.Conversations = new SlackConversationService_(this);
    this.Chat = new SlackChatService_(this);
  }

  makeQueryString = <T>(params: T): string => {
    const keys: Array<keyof T> = Object.keys(params) as Array<keyof T>;
    return keys.map((k) => `${k}=${params[k]}`).join("&");
  };

  makeRequestOptions = <T>(
    method: GASlack.Request.HttpMethod,
    contentType: string,
    payload?: T
  ): GoogleAppsScript.URL_Fetch.URLFetchRequestOptions => {
    const option: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: method,
      contentType: contentType,
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
