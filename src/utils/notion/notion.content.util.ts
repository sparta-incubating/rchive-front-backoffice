import { Client } from '@notionhq/client';
import {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  RichTextItemResponse,
  ToDoBlockObjectResponse,
  ToggleBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// 단어 사이의 공백은 유지하고 줄바꿈만 제거
function cleanText(text: string): string {
  return text.replace(/[\n\r]+/g, ' ').trim();
}

// 텍스트 추출 함수 (링크 제외)
function extractTextFromRichText(richText: RichTextItemResponse[]): string {
  return cleanText(
    richText
      .filter((text) => !text.href) // 링크가 없는 텍스트만 포함
      .map((text) => text.plain_text)
      .join(' '),
  );
}

// 타입 가드 함수들 (생략, 기존 코드 동일)
function isParagraphBlock(
  block: BlockObjectResponse,
): block is ParagraphBlockObjectResponse {
  return block.type === 'paragraph';
}

function isHeading1Block(
  block: BlockObjectResponse,
): block is Heading1BlockObjectResponse {
  return block.type === 'heading_1';
}

function isHeading2Block(
  block: BlockObjectResponse,
): block is Heading2BlockObjectResponse {
  return block.type === 'heading_2';
}

function isHeading3Block(
  block: BlockObjectResponse,
): block is Heading3BlockObjectResponse {
  return block.type === 'heading_3';
}

function isBulletedListItemBlock(
  block: BlockObjectResponse,
): block is BulletedListItemBlockObjectResponse {
  return block.type === 'bulleted_list_item';
}

function isNumberedListItemBlock(
  block: BlockObjectResponse,
): block is NumberedListItemBlockObjectResponse {
  return block.type === 'numbered_list_item';
}

function isToDoBlock(
  block: BlockObjectResponse,
): block is ToDoBlockObjectResponse {
  return block.type === 'to_do';
}

function isToggleBlock(
  block: BlockObjectResponse,
): block is ToggleBlockObjectResponse {
  return block.type === 'toggle';
}

function isChildPageBlock(
  block: BlockObjectResponse,
): block is Extract<BlockObjectResponse, { type: 'child_page' }> {
  return block.type === 'child_page';
}

function isChildDatabaseBlock(
  block: BlockObjectResponse,
): block is Extract<BlockObjectResponse, { type: 'child_database' }> {
  return block.type === 'child_database';
}

// 블록 타입 필터링 (이미지, 영상 제외)
const BLOCK_TYPES_TO_PROCESS = new Set([
  'paragraph',
  'heading_1',
  'heading_2',
  'heading_3',
  'bulleted_list_item',
  'numbered_list_item',
  'to_do',
  'toggle',
  'callout',
  'quote',
  'child_page',
  'child_database',
  'table',
  'column_list',
]);

async function extractTextFromBlock(
  block: BlockObjectResponse,
  notionClient: Client,
): Promise<string> {
  let text = '';

  if (!BLOCK_TYPES_TO_PROCESS.has(block.type)) {
    return text;
  }

  if (isParagraphBlock(block)) {
    text += extractTextFromRichText(block.paragraph.rich_text);
  } else if (isHeading1Block(block)) {
    text += extractTextFromRichText(block.heading_1.rich_text);
  } else if (isHeading2Block(block)) {
    text += extractTextFromRichText(block.heading_2.rich_text);
  } else if (isHeading3Block(block)) {
    text += extractTextFromRichText(block.heading_3.rich_text);
  } else if (isChildPageBlock(block)) {
    text += cleanText(block.child_page.title);
  } else if (isChildDatabaseBlock(block)) {
    text += cleanText(block.child_database.title);
  } else if (isBulletedListItemBlock(block)) {
    text += extractTextFromRichText(block.bulleted_list_item.rich_text);
  } else if (isNumberedListItemBlock(block)) {
    text += extractTextFromRichText(block.numbered_list_item.rich_text);
  } else if (isToDoBlock(block)) {
    text += extractTextFromRichText(block.to_do.rich_text);
  } else if (isToggleBlock(block)) {
    text += '>' + extractTextFromRichText(block.toggle.rich_text);
  } else if (block.type === 'callout') {
    text += extractTextFromRichText(block.callout.rich_text);
  } else if (block.type === 'quote') {
    text += extractTextFromRichText(block.quote.rich_text);
  }

  // 자식 블록 처리 (병렬 처리)
  if (
    [
      'toggle',
      'numbered_list_item',
      'bulleted_list_item',
      'column',
      'child_page',
      'child_database',
      'table',
    ].includes(block.type) &&
    block.has_children
  ) {
    text += await extractTextFromChildren(block.id, notionClient);
  }

  // 테이블 및 컬럼 리스트 처리
  if (block.type === 'table') {
    const tableRows = await getBlockChildren(block.id, notionClient);
    const rowTexts = await Promise.all(
      tableRows.map(async (row) => {
        if (row.type === 'table_row') {
          const cellTexts = row.table_row.cells.map((cell) =>
            cleanText(cell.map((text) => text.plain_text).join(' ')),
          );
          return cellTexts.join(' | ');
        }
        return '';
      }),
    );
    text += rowTexts.join('\n');
  }

  if (block.type === 'column_list') {
    const columns = await getBlockChildren(block.id, notionClient);
    const columnTexts = await Promise.all(
      columns.map(async (column) => {
        if (column.type === 'column') {
          return await extractTextFromChildren(column.id, notionClient);
        }
        return '';
      }),
    );
    text += columnTexts.join(' | ');
  }

  return cleanText(text);
}

async function getBlockChildren(
  blockId: string,
  notionClient: Client,
): Promise<BlockObjectResponse[]> {
  let allChildren: BlockObjectResponse[] = [];
  let hasMore = true;
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const response = await notionClient.blocks.children.list({
      block_id: blockId,
      start_cursor: startCursor,
      page_size: 100, // 최대 페이지 사이즈로 설정
    });

    allChildren = allChildren.concat(response.results as BlockObjectResponse[]);
    hasMore = response.has_more;
    startCursor = response.next_cursor ?? undefined;
  }

  return allChildren;
}

async function extractTextFromChildren(
  blockId: string,
  notionClient: Client,
): Promise<string> {
  const children = await getBlockChildren(blockId, notionClient);
  const texts = await Promise.all(
    children.map((child) => extractTextFromBlock(child, notionClient)),
  );
  return cleanText(texts.join(' '));
}

export async function getPageContent(
  pageId: string,
  notionClient: Client,
): Promise<string> {
  try {
    return await extractTextFromChildren(pageId, notionClient);
  } catch (error) {
    console.error('Error extracting page content:', error);
    throw error;
  }
}
