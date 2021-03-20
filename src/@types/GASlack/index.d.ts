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

  namespace UsersService {
    interface MemberProfile {
      avatar_hash: string;
      status_text: string;
      status_emoji: string;
      real_name: string;
      display_name: string;
      real_name_normalized: string;
      display_name_normalized: string;
      email: string;
      image_24: string;
      image_32: string;
      image_48: string;
      image_72: string;
      image_192: string;
      image_512: string;
      team: string;
    }
    interface Member {
      id: string;
      team_id: string;
      name: string;
      deleted: boolean;
      color: string;
      real_name: string;
      tz: string;
      tz_label: string;
      tz_offset: number;
      profile: MemberProfile;
      is_admin: boolean;
      is_owner: boolean;
      is_primary_owner: boolean;
      is_restricted: boolean;
      is_ultra_restricted: string;
      is_bot: boolean;
      updated: number;
      is_app_user: boolean;
      has_2fa: boolean;
    }
    interface UsersListResponse extends SlackAPIResponse {
      members: Member[];
      cache_ts: number;
      response_metadata: {
        next_cursor: string;
      };
    }
    interface UsersListParams {
      limit?: number;
      include_locale?: boolean;
    }
    interface Users {
      list: (params: UsersListParams) => GASlack.UsersService.UsersListResponse;
    }
  }
}
