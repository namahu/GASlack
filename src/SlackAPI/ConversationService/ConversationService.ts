export default class SlackConversationService_
  implements GASlack.ConversationService.Conversation {
  readonly GASlack: GASlack.IGASlack;

  constructor(GASlack: GASlack.IGASlack) {
    this.GASlack = GASlack;
  }

  public getConversationsList = (
    params?: GASlack.ConversationService.ConversationParams
  ) => {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = this.GASlack.makeRequestOptions(
      "get"
    );

    return this.GASlack.fetch("conversations.list", options);
  };
}
