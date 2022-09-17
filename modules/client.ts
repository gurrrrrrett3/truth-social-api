import fetch from "node-fetch";
import config from "../config";
import Account from "./objects/account";
import Status from "./objects/status";

interface ClientOptions {
  // ...
  username?: string;
  password?: string;
  clientId?: string;
  clientSecret?: string;
}

export default class TruthSocialClient {
  auth?: {
    token: string;
    tokenType: string;
    scope: string;
    createdAt: number;
  };

  constructor(opt: ClientOptions) {
    if (opt.username && opt.password) {
      this.login({
        username: opt.username,
        password: opt.password,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
      });
    }
  }

  async login(info: { username: string; password: string; clientId: string; clientSecret: string }) {
    const res = await fetch("https://truthsocial.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password,
        scope: "read write follow push",
        grant_type: "password",
        redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
        client_id: info.clientId,
        client_secret: info.clientSecret,
      }),
    })

    const json = await res.json()
    
    if (json.error) {
      throw new Error(json.error);
    }

    this.auth = {
      token: json.access_token,
      tokenType: json.token_type,
      scope: json.scope,
      createdAt: json.created_at,
    };

    console.log("Logged in as", info.username);
  }

  public isLoggedIn() {
    return !!this.auth;
  }

  private async request(url: string, method: string, qs?: { [key: string]: any }, body?: any) {
    if (!this.auth) {
      throw new Error("Not logged in");
    }

    const qsUrl = new URL(url);
    if (qs) {
      for (const key in qs) {
        qsUrl.searchParams.append(key, qs[key]);
      }
    }

    const res = await fetch(qsUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${this.auth.tokenType} ${this.auth.token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status == 429) {
      throw new Error("Rate limited");
    }

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    return json;
  }

  public timeline = {
    home: async (): Promise<Status[]> => {
      return this.request("https://truthsocial.com/api/v1/timelines/home", "GET").then((json) => {
        return json.map((status: any) => new Status(status));
      });
    },
  };

  public account = {
    verifyCredentials: async ():Promise<VerifyCredentialsData> => {
      return this.request("https://truthsocial.com/api/v1/accounts/verify_credentials", "GET");
    },
    get: async (
      id: string,
    ): Promise<Account> => {
      return new Account(await this.request(`https://truthsocial.com/api/v1/accounts/${id}`, "GET"));
    },
    follow: async (id: string): Promise<Account> => {
      return new Account(await this.request(`https://truthsocial.com/api/v1/accounts/${id}/follow`, "POST"));
    },
    unfollow: async (id: string): Promise<Account> => {
      return new Account(await this.request(`https://truthsocial.com/api/v1/accounts/${id}/unfollow`, "POST"));
    },
  };

  public status = {
    get: async (id: string): Promise<Status> => {
      return new Status(await this.request(`https://truthsocial.com/api/v1/statuses/${id}`, "GET"));
    },
    post: async (status: string): Promise<any> => {
      return await this.request("https://truthsocial.com/api/v1/statuses", "POST", undefined, { status });
    },
    delete: async (id: string): Promise<Status> => {
      return new Status(await this.request(`https://truthsocial.com/api/v1/statuses/${id}`, "DELETE"));
    },
    getUser: async (
      id: string,
      options?: {
        pinned?: boolean;
        with_muted?: boolean;
        exclude_replies?: boolean;
      }
    ): Promise<Status[]> => {
      const data = await this.request(`https://truthsocial.com/api/v1/accounts/${id}/statuses`, "GET", options);
      return data.map((status: StatusData) => new Status(status));
    },
  };

  public carousels = {
    suggestions: async (limit: number): Promise<Suggestion[]> => {
      return await this.request(`https://truthsocial.com/api/v1/truth/carousels/suggestions`, "GET", { limit });
    },
  };
}
