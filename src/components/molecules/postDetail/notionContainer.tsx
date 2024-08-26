'use client';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import NotionLink from '@/components/molecules/postDetail/notionLink';
import { extractPageId } from '@/utils/notionAPI';

import axios from 'axios';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

const NotionContainer = ({ notionLink }: { notionLink: string }) => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const handleNotion = async () => {
    return axios.get(`/api/notion/page?pageId=${extractPageId(notionLink)}`);
  };

  useEffect(() => {
    (async () => {
      const response = await handleNotion();
      setRecordMap(response.data.data);
    })();
  }, []);

  if (recordMap === null) return <div>로딩중...</div>;

  return (
    <section className="flex flex-col">
      <NotionLink notionLink={notionLink} />
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        mapPageUrl={(pageId) =>
          `https://www.notion.so/${pageId.replace(/-/g, '')}`
        }
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </section>
  );
};

export default NotionContainer;
