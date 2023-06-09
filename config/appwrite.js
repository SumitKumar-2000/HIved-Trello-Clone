import {Client, Account, Database, Storage} from "appwrite"

const client = new Client();


client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(process.env.CLIENT_APPWRITE_PROJECT_ID);

const database = new Database(client);
const account = new Account(client);
const storage = new Storage(client);

export {client, account, database, storage};

