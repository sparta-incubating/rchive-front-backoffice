import { getPageContent } from '@/utils/notion/notion.content.util';
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
      const content = await getPageContent(url, notion).catch();

      return NextResponse.json({ result: content });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Notion 데이터베이스 접근 오류',
        message: 'notion data 호출에 실패했습니다.',
      },
      { status: 404 },
    );
  }
}
