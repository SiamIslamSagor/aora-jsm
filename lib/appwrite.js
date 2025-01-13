import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.siamdev.aora",
  projectId: "6782b35e003e78d32992",
  databaseId: "6782b6b8000f81f066f4",
  userCollectionId: "6782b6ee0006537003a1",
  videoCollectionId: "6782b71d002064f9f930",
  storageId: "6782ba1b000cc87ac8f5",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    console.log("1  signin::", email, password);
    const session = await account.createEmailPasswordSession(email, password);

    console.log("2  signin::", email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {}
};

// Log Out
export const logOut = async () => {
  try {
    const deleteSession = await account.deleteSession("current");
    console.log("user logged out");
    return deleteSession;
  } catch (error) {
    throw new Error(error);
  }
};
