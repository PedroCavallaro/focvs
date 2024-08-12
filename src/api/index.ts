import { HttpClient } from "./http";
import { HttpFactory } from "./http/http.factory";
import { buildRepos } from "./repositories";

class ApiBuilder {
  private repositories!: ReturnType<typeof buildRepos>;
  private client!: HttpClient;

  setClient(client: HttpClient) {
    this.client = client;
    return this;
  }
  setRepos() {
    if (!this.client) {
      throw new Error("Http client not provided");
    }

    this.repositories = buildRepos(this.client);
    return this;
  }

  build() {
    if (!this.repositories) {
      throw new Error("Repositories not provided");
    }

    return {
      ...this.repositories,
    };
  }
}

const factory = new HttpFactory(process.env.EXPO_PUBLIC_API_URL);
const client = factory.createAxiosClient();

const builder = new ApiBuilder();

export const api = builder.setClient(client).setRepos().build();
