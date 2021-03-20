class SlackUsersService_ implements GASlack.UsersService.Users {
  readonly GASlack: GASlack.IGASlack;

  constructor(GASlack: GASlack.IGASlack) {
    this.GASlack = GASlack;
  }
  public list = (
    params: GASlack.UsersService.UsersListParams
  ): GASlack.UsersService.UsersListResponse => {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = this.GASlack.makeRequestOptions(
      "get",
      "application/x-www-form-urlencoded"
    );

    const query: string = params
      ? `?${this.GASlack.makeQueryString(params)}`
      : "";

    return this.GASlack.fetch<GASlack.UsersService.UsersListResponse>(
      `users.list/${query}`,
      options
    );
  };
}
