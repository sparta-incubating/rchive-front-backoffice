import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  try {
    const notion = new NotionAPI();
    if (pageId) {
      const notionPage = await notion.getPage(pageId);
      return NextResponse.json({ data: notionPage });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Notion 웹 공유 설정 오류',
        message: '접근할 수 있도록 웹에 게시해주세요.',
      },
      { status: 404 },
    );
  }
}
