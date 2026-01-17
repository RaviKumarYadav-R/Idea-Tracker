import { Client, Account, ID } from "appwrite";
import { appwriteConfig } from "../../Conf/conf.js";

class AppWriteAuth {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(appwriteConfig.appWriteUrl);
    this.client.setProject(appwriteConfig.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createNewAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        // add Auto login after signup
        return await this.loginUser({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error in create account", error.message);
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.log("Error in login user", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      return null;
    }
  }

  async logoutUser() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in logout User", error);
    }
  }
}

const appWriteAuth = new AppWriteAuth();
export default appWriteAuth;
