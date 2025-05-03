"use server";

import { ID } from "node-appwrite";

import {
  DATABASE_ID,
  USER_COLLECTION_ID,
  users,
  databases,
} from "@/lib/appwrite.config";
import { UserRole } from "@/types/appwrite.types";



export async function registerUser(fullName: string, email: string, password: string, role: UserRole) {
  try {
    // Create Appwrite user
    const user = await users.create(ID.unique(), email, password, fullName);

    // Save role and fullName to DB
    await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID, // 'users' collection
      ID.unique(),
      {
        userId: user.$id,
        fullName,
        email,
        role
      }
    );

    return { success: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
