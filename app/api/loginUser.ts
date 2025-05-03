"use server";

import { Query } from "node-appwrite";

import { DATABASE_ID,
    USER_COLLECTION_ID, 
    users, 
    databases } from "@/lib/appwrite.config";

    export async function loginUser(email: string, password: string) {
        try {
          // 1. Create session
          await users.createSession({
            userId: email,
            secret: password,
          });
      
          // 2. Look up user by email to get role
          const result = await databases.listDocuments(
            DATABASE_ID,
            USER_COLLECTION_ID,
            [Query.equal("email", email)]
          );
      
          if (result.documents.length === 0) {
            throw new Error("No user profile found in database.");
          }
      
          const userDoc = result.documents[0];
      
          return {
            success: true,
            role: userDoc.role,
          };
        } catch (error) {
          return {
            error: (error as Error).message,
          };
        }
      }