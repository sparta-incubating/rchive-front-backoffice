'use server';

import { revalidatePath } from 'next/cache';

export async function revalidatePostsAction(path: string) {
  revalidatePath(path);
}
