declare namespace GASlack {
  type SlackAPIBaseURL = "https://slack.com/api/";
  type SlackToken = string;

  namespace Request {
    type HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;
  }

  interface IGASlack {
    makeRequestOptions: <T>(
      method: GoogleAppsScript.URL_Fetch.HttpMethod,
      payload?: T
    ) => GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

    fetch: <T>(
      endpoint: string,
      options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
    ) => T;
  }

  namespace ChatService {
    type Payload = {
      channel: string;
      text: string;
    };

    type Response = {
      ok: boolean;
      channel: string;
      ts: string;
      message?: any;
      error?: any;
    };

    interface Chat {
      postMessage: (payload: Payload) => Response;
    }
  }

  namespace ConversationService {
    interface Conversation {
      getConversationsList: () => any;
    }
  }
}
