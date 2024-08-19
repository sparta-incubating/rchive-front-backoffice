import { auth, signOut } from '@/auth';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default async function POST(req: NextApiRequest) {
  const res = NextResponse.next();

  const session = await auth();
  console.log({ session });
  try {
    if (session && session.user) {
      await signOut();
    }
  } catch (error) {
    console.log(error);
  }
}
