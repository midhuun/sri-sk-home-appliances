import { connectToDB } from './app/lib/db';

export async function register() {
    await connectToDB();
}