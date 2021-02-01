/**
 * Chat API class
 */
export default class SlackChatService_ implements GASlack.ChatService.Chat {
  readonly GASlack: GASlack.IGASlack;

  /**
   * constructor
   *
   * @param { GASlack } GASlack - Instances of GASlack
   */
  constructor(GASlack: GASlack.IGASlack) {
    this.GASlack = GASlack;
  }

  /**
   * Post a message to Slack
   *
   * @param { object } payload - chat payload
   * @return { object} - response
   */
  public postMessage = (payload: GASlack.ChatService.Payload) => {
    const requestOptions: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = this.GASlack.makeRequestOptions(
      "post",
      payload
    );
    return this.GASlack.fetch<GASlack.ChatService.Response>(
      "chat.postMessage",
      requestOptions
    );
  };
}
