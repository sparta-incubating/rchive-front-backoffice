/**
 * Notion URL pageId 추출 함수
 * @param{string} url
 */
export const extractPageId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    const pageId = parsedUrl.searchParams.get('p');
    if (pageId && pageId.match(/^[a-f0-9]{32}$/)) {
      return pageId;
    } else {
      const pathMatch = parsedUrl.pathname.match(/([a-f0-9]{32})/);
      return pathMatch ? pathMatch[1] : null;
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};
/*
export const validateNotionDatabaseURL = async (url: string) => {
  try {
    const notion = new Client();
    const n2m = new NotionToMarkdown({ notionClient: notion });
    await n2m.pageToMarkdown(url);
  } catch (error) {
    throw new Error(
      'notion database에 등록한 게시물인지 확인하시고 다시시도해주세요.',
    );
  }
};

export const validateNotionContentURL = async (url: string) => {
  try {
    const notion = new NotionAPI();
    await notion.getPage(url);
  } catch (error) {
    throw new Error('web 공유 설정을 확인하시고  다시시도해주세요.');
  }
};
*/
