import { Client, TablesDB, ID } from "appwrite";
import { appwriteConfig } from "../../Conf/conf.js";

class AppWriteDatabase {
  client = new Client();
  database;
  constructor() {
    this.client.setEndpoint(appwriteConfig.appWriteUrl);
    this.client.setProject(appwriteConfig.appWriteProjectId);
    this.database = new TablesDB(this.client);
  }

  async createDocument({ userId, userName, title, description }) {
    try {
      const document = await this.database.createRow({
        databaseId: appwriteConfig.appWriteDatabaseId,
        tableId: appwriteConfig.appWriteCollectionId,
        rowId: ID.unique(),
        data: {
          title,
          description,
          userId,
          userName,
        },
      });

      return document;
    } catch (error) {
      console.log("Error in create document", error);
    }
  }

  async removeDocument(documentId) {
    try {
      const result = await this.database.deleteRow({
        databaseId: appwriteConfig.appWriteDatabaseId,
        tableId: appwriteConfig.appWriteCollectionId,
        rowId: documentId,
      });
    } catch (error) {
      console.log("Error in remove document", error);
    }
  }

  async getAllDocuments() {
    try {
      return await this.database.listRows({
        databaseId: appwriteConfig.appWriteDatabaseId,
        tableId: appwriteConfig.appWriteCollectionId,
      });
    } catch (error) {
      console.log("Error in get all documents", error);
    }
  }
}

const appWriteDatabase = new AppWriteDatabase();
export default appWriteDatabase;
