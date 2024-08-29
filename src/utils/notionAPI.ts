import axios from 'axios';
import dynamic from 'next/dynamic';

/**
 * Notion URL pageId 추출 함수
 * @param{string} url
 */
export const extractPageId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);
    // p= 파라미터가 있는 경우 그 값을 반환
    if (params.has('p')) {
      return params.get('p');
    }

    // p= 파라미터가 없는 경우 URL의 path 부분에서 32자리 16진수 문자열을 추출
    const path = parsedUrl.pathname;
    const regex = /([a-f0-9]{32})/;
    const match = path.match(regex);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
};

export const validateNotionPageId = async (pageId: string) => {
  await Promise.all([
    axios.get(
      `/api/backoffice/notion/database?url=${encodeURIComponent(pageId)}`,
    ),
    axios.get(
      `/api/backoffice/notion/webShare?url=${encodeURIComponent(pageId)}`,
    ),
  ]);
};

// notion renderer에 필요한 property
export const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code),
);

export const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);

export const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);

export const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  { ssr: false },
);

export const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  { ssr: false },
);
