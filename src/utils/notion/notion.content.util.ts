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

// 텍스트 정제 함수 추가
function removeAllWhitespace(text: string): string {
  return text.replace(/\s+/g, '');
}

// 텍스트 추출 함수
function extractTextFromRichTextReduce(
  richText: RichTextItemResponse[],
): string {
  return removeAllWhitespace(
    richText.reduce((acc, cur) => {
      acc += cur.plain_text;
      return acc;
    }, ''),
  );
}

async function extractTextFromRichText(
  richText: RichTextItemResponse[],
): Promise<string> {
  return removeAllWhitespace(richText.map((text) => text.plain_text).join(''));
}

// 타입 가드 함수들
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

async function extractTextFromBlock(
  block: BlockObjectResponse,
  notionClient: Client,
): Promise<string> {
  let text = '';

  if (isParagraphBlock(block)) {
    text += await extractTextFromRichText(block.paragraph.rich_text);
  } else if (isHeading1Block(block)) {
    text += await extractTextFromRichText(block.heading_1.rich_text);
  } else if (isHeading2Block(block)) {
    text += await extractTextFromRichText(block.heading_2.rich_text);
  } else if (isHeading3Block(block)) {
    text += await extractTextFromRichText(block.heading_3.rich_text);
  } else if (isChildPageBlock(block)) {
    text += removeAllWhitespace(block.child_page.title);
  } else if (isChildDatabaseBlock(block)) {
    text += removeAllWhitespace(block.child_database.title);
  } else if (isBulletedListItemBlock(block)) {
    text += await extractTextFromRichText(block.bulleted_list_item.rich_text);
  } else if (isNumberedListItemBlock(block)) {
    text += await extractTextFromRichText(block.numbered_list_item.rich_text);
    if (block.has_children) {
      text += await extractTextFromChildren(block.id, notionClient);
    }
  } else if (isToDoBlock(block)) {
    text += await extractTextFromRichText(block.to_do.rich_text);
  } else if (isToggleBlock(block)) {
    text += '>' + (await extractTextFromRichText(block.toggle.rich_text));
    text += await extractTextFromChildren(block.id, notionClient);
  } else if (block.type === 'callout') {
    text += extractTextFromRichTextReduce(block.callout.rich_text);
  } else if (block.type === 'quote') {
    text += extractTextFromRichTextReduce(block.quote.rich_text);
  }
  // embed link 추출 가능
  /* if (block.type === 'embed') {
     console.log({ block });
   }*/

  // Handle other specific block types
  switch (block.type) {
    case 'table': {
      const tableRows = await getBlockChildren(block.id, notionClient);
      for (const row of tableRows) {
        if (row.type === 'table_row') {
          const cellTexts = await Promise.all(
            row.table_row.cells.map(extractTextFromRichText),
          );
          text += cellTexts.join(' | ');
        }
      }
      break;
    }
    case 'column_list': {
      const columns = await getBlockChildren(block.id, notionClient);
      for (const column of columns) {
        if (column.type === 'column') {
          text += await extractTextFromChildren(column.id, notionClient);
        }
      }
      break;
    }
  }

  return removeAllWhitespace(text);
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
  let text = '';

  for (const child of children) {
    text += await extractTextFromBlock(child, notionClient);
  }
  return removeAllWhitespace(text);
}

export async function getPageContent(
  pageId: string,
  notionClient: Client,
): Promise<string> {
  try {
    const content = await extractTextFromChildren(pageId, notionClient);
    return removeAllWhitespace(content);
  } catch (error) {
    console.error('Error extracting page content:', error);
    throw error;
  }
}
