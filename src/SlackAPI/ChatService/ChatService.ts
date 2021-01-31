class SlackChatService implements GASlack.ChatService.Chat {
  readonly GASlack: GASlack.IGASlack;

  constructor(GASlack: GASlack.IGASlack) {
    this.GASlack = GASlack;
  }
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

export { SlackChatService };
