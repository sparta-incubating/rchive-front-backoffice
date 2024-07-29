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
        message:
          'notion database에 등록한 게시물인지 확인하시고 다시 시도해주세요.',
      },
      { status: 404 },
    );
  }
}
