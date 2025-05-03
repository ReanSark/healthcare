import * as sdk from "node-appwrite";

// lib/appwrite.constants.ts
export const DATABASE_ID: string = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "677aaa16003251a96ebc";
export const USER_COLLECTION_ID: string = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID ?? "6815f5a5003774dda828";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
