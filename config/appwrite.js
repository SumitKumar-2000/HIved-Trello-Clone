import {Client, Account, ID, Database, Storage} from "appwrite"

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.CLIENT_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databse = new Database(client);
const storage = new Storage(client);

export {client, account, databse, storage, ID};

