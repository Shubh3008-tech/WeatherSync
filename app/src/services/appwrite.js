import { Client, Account, Databases, ID, Query } from 'appwrite';

const client = new Client();

const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const postsCollectionId = import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID;

client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);

export const authService = {
  async getAccount() {
    try {
      return await account.get();
    } catch (_) {
      return null;
    }
  },
  async login(email, password) {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  },
  async register(email, password, name) {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  },
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (_) {
      // ignore
    }
  },
};

export const postsService = {
  async list({ search = '', limit = 20, cursor = undefined } = {}) {
    const queries = [Query.orderDesc('$createdAt'), Query.limit(limit)];
    if (cursor) queries.push(Query.cursorAfter(cursor));
    if (search) queries.push(Query.search('title', search));
    return databases.listDocuments(databaseId, postsCollectionId, queries);
  },
  async get(id) {
    return databases.getDocument(databaseId, postsCollectionId, id);
  },
  async create({ title, slug, content, authorId, authorName, coverImageUrl }) {
    const data = { title, slug, content, authorId, authorName, coverImageUrl };
    return databases.createDocument(databaseId, postsCollectionId, ID.unique(), data);
  },
  async update(id, data) {
    return databases.updateDocument(databaseId, postsCollectionId, id, data);
  },
  async remove(id) {
    return databases.deleteDocument(databaseId, postsCollectionId, id);
  },
};
