import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';
import { NotionToMarkdown } from 'notion-to-md';

const notionAPIURL = process.env.NOTION_API;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  try {
    const notion = new Client({
      auth: notionAPIURL,
    });

    if (url) {
      const n2m = new NotionToMarkdown({ notionClient: notion });

      const mdblocks = await n2m.pageToMarkdown(url);
      const mdString = n2m.toMarkdownString(mdblocks);

      return NextResponse.json({ result: mdString.parent.toString() });
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
