import { IGASlack } from "../../Interface/GASlack";
import { ISlackChatService } from "../../Interface/ChatService/ChatService";

export class SlackChatService implements ISlackChatService {
  readonly GASlack: IGASlack;

  constructor(GASlack: IGASlack) {
    this.GASlack = GASlack;
  }
  public postMessage = (payload) => {
    const requestOptions: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = this.GASlack.makeRequestOptions(
      "post",
      payload
    );
    return this.GASlack.fetch("chat.postMessage", requestOptions);
  };
}
