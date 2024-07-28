import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  try {
    const notion = new NotionAPI();
    if (url) {
      await notion.getPage(url);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Notion 웹 공유 설정 오류',
        message: 'web 공유 설정을 확인하시고 다시 시도해주세요.',
      },
      { status: 404 },
    );
  }
}