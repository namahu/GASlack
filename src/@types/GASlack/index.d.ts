declare namespace GASlack {
  type SlackAPIBaseURL = "https://slack.com/api/";
  type SlackToken = string;

  namespace Request {
    type HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;
  }

  interface IGASlack {
    makeQueryString: <T>(params: T) => string;
    makeRequestOptions: <T>(
      method: GoogleAppsScript.URL_Fetch.HttpMethod,
      contentType: string,
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
    enum channelTypes {
      PUBLIC = "public_channel",
      PRIVATE = "private_channel",
    }

    type ConversationParams = {
      limit?: number;
      types?: string;
    };
    interface Conversation {
      getConversationsList: (params?: ConversationParams) => any;
    }
  }
}
