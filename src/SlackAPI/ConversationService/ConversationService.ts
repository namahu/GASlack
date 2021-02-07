export default class SlackConversationsService_
  implements GASlack.ConversationsService.Conversations {
  readonly GASlack: GASlack.IGASlack;

  constructor(GASlack: GASlack.IGASlack) {
    this.GASlack = GASlack;
  }

  public list = (params?: GASlack.ConversationsService.ConversationsParams) => {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = this.GASlack.makeRequestOptions(
      "get",
      "application/x-www-form-urlencoded"
    );

    const query: string = params
      ? `?${this.GASlack.makeQueryString(params)}`
      : "";

    return this.GASlack.fetch(`conversations.list/${query}`, options);
  };
}
