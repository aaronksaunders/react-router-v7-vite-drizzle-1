import { db } from "~/db";
import { users, posts, User } from "~/db/schema";
import { eq } from "drizzle-orm";

/**
 * Fetches a contact from the database by its ID.
 *
 * @param id - The ID of the contact to fetch.
 * @returns {Promise<User | null>}A promise that resolves to the contact object if found, or null if not found.
 */
export const fetchContact = async (id: string) => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, parseInt(id)))
        .limit(1);
    return result[0] || null;
};

/**
 * Fetches all posts from the database.
 *
 * @returns {Promise<any[]>} A promise that resolves to an array of posts.
 */
export const fetchPosts = async () => {
    const result = await db.select().from(posts).all();
    return result;
};

/**
 * Creates a new user in the database with the provided name, email, and username.
 *
 * @param name - The name of the user.
 * @param email - The email address of the user.
 * @param username - The username for the user.
 * @returns {Promise<User | null>} The created user object or null if the creation failed.
 */
export const createUser = async (
    name: string,
    email: string,
    username: string
) => {
    const result = await db
        .insert(users)
        .values({ name, email, username })
        .returning();
    return result[0] || null;
};

/**
 * Fetches all users from the database.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of user records.
 */
export const fetchUsers = async () => {
    const result = await db.select().from(users).all();
    return result;
};
