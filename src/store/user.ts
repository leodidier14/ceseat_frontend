import { Getter } from "vuex-class";
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

@Module({ name: "user" })
export default class User extends VuexModule {
  public token: string = "";
  public roleType: string = "";
  public roleId: number = 0;
  public userId: number = 0;

  @Mutation
  private SET_TOKEN(newToken: string): void {
    if (newToken != null) {
      this.token = newToken;
    }
  }

  @Mutation
  private SET_ROLETYPE(newRoleType: string): void {
    if (newRoleType != null) {
      this.roleType = newRoleType;
    }
  }

  @Mutation
  private SET_ROLEID(newRoleId: number): void {
    if (newRoleId != null) {
      this.roleId = newRoleId;
    }
  }

  @Mutation
  private SET_USERID(newUserID: number): void {
    if (newUserID != null) {
      this.userId = newUserID;
    }
  }

  @Action({ rawError: true })
  public async set_token(newToken: string): Promise<string> {
    await this.SET_TOKEN(newToken);
    return this.token;
  }

  @Action({ rawError: true })
  public async set_roleType(newRoleType: string): Promise<string> {
    await this.SET_ROLETYPE(newRoleType);
    return this.roleType;
  }

  @Action({ rawError: true })
  public async set_roleId(newRoleId: number): Promise<number> {
    await this.SET_ROLEID(newRoleId);
    return this.roleId;
  }

  @Action({ rawError: true })
  public async set_userId(newUserID: number): Promise<number> {
    await this.SET_USERID(newUserID);
    return this.userId;
  }
}
