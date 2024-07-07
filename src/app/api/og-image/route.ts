import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const ogImage = $('meta[property="og:image"]').attr('content');

    if (ogImage) {
      return NextResponse.json({ ogImage });
    } else {
      return NextResponse.json(
        { error: 'OG 이미지를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error('Error fetching OG image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch OG image' },
      { status: 500 },
    );
  }
}
