declare namespace GASlack {
  type SlackAPIBaseURL = "https://slack.com/api/";
  type SlackToken = string;

  interface SlackAPIResponse {
    ok: boolean;
    error?: any;
  }

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

  namespace ConversationsService {
    enum channelTypes {
      PUBLIC = "public_channel",
      PRIVATE = "private_channel",
    }

    type ConversationsParams = {
      limit?: number;
      types?: string;
    };

    interface Channel {
      id: string;
      name: string;
      is_channel: boolean;
      is_group: boolean;
      is_im: boolean;
      created: number;
      creator: string;
      is_archived: boolean;
      is_general: boolean;
      unlinked: number;
      name_normalized: string;
      is_read_only: boolean;
      is_shared: boolean;
      is_ext_shared: boolean;
      is_org_shared: boolean;
      pending_shared: any[];
      is_pending_ext_shared: boolean;
      is_member: boolean;
      is_private: boolean;
      is_mpim: boolean;
      last_read: string;
      topic: {
        value: string;
        creator: string;
        last_set: number;
      };
      purpose: {
        value: string;
        creator: string;
        last_set: number;
      };
      previous_names: string[];
      num_members: number;
      locale: string;
    }

    interface ConversationsResponse extends SlackAPIResponse {
      Channels: Channel[];
      response_metadata: {
        next_cursor: string;
      };
    }
    interface Conversations {
      list: (params?: ConversationsParams) => any;
    }
  }
}
