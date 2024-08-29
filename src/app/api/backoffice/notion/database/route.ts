import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notionAPIURL = process.env.NOTION_API;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  try {
    const notion = new Client({
      auth: notionAPIURL,
    });

    if (url) {
      await notion.pages.retrieve({ page_id: url });
      return NextResponse.json({ result: true });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Notion 데이터베이스 접근 오류',
        message: '노션 데이터베이스 안에 작성해주세요.',
      },
      { status: 404 },
    );
  }
}
