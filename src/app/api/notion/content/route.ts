import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';
import { NotionToMarkdown } from 'notion-to-md';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

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

      const load = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(mdString.parent);
      const data = load.value
        .toString()
        .replace(
          /<([^>]+)>|!\[[^\]]*\]\([^)]+\)|\[\S+?\]\([^)]+\)|\*\*|\s+|[`~!@#$%^&*()_+\-=$begin:math:display$$end:math:display${};':"\\|,.<>/?]/gi,
          '',
        );
      // .replace(
      //   /<([^>]+)>|!\[[^\]]*\]\([^)]+\)|\[\S+?\]\([^)]+\)|\*\*|\s+|[`~!@#$%^&*()_+\-=$begin:math:display$$end:math:display${};':"\\|,.<>\/?]/gi,
      //   '',
      // );
      return NextResponse.json({ result: data });
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
