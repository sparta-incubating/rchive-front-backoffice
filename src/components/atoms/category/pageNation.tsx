'use client';

import Pagination from '@/utils/pageNation.util';
import Image from 'next/image';

interface PageNationProps {
  currentPage: number;
  totalElements: number;
  size: number;
  onPageChange: (page: number) => void;
}

const PageNation = ({
  currentPage,
  totalElements,
  size,
  onPageChange,
}: PageNationProps) => {
  const totalPages = Math.ceil(totalElements / size);
  const pagination = new Pagination(totalPages, currentPage, 5);

  return (
    <section className="mx-auto h-[32px] w-full">
      <div className="flex flex-row justify-center">
        {pagination.hasPreviousGroup() && (
          <button
            onClick={() => onPageChange(pagination.getPreviousGroupFirstPage())}
          >
            <Image
              src={'/assets/icons/initPage.svg'}
              width={32}
              height={32}
              alt="이전 그룹"
            />
          </button>
        )}
        {pagination.hasPreviousPage() && (
          <button onClick={() => onPageChange(pagination.getPreviousPage())}>
            <Image
              src={'/assets/icons/prevPage.svg'}
              width={32}
              height={32}
              alt="이전 페이지"
            />
          </button>
        )}

        {pagination.getPageNumbers().map((page) => {
          return (
            <div
              key={page}
              className={`flex h-[32px] w-[32px] items-center rounded-full ${
                page === currentPage ? 'bg-blue-55' : ''
              }`}
              onClick={() => onPageChange(page)}
            >
              <p className="w-[32px] text-center">{page}</p>
            </div>
          );
        })}

        {pagination.hasNextPage() && (
          <button onClick={() => onPageChange(pagination.getNextPage())}>
            <Image
              src={'/assets/icons/nextPage.svg'}
              width={32}
              height={32}
              alt="다음 페이지"
            />
          </button>
        )}
        {pagination.hasNextGroup() && (
          <button onClick={() => onPageChange(pagination.getLastPage())}>
            <Image
              src={'/assets/icons/nonNext.svg'}
              width={32}
              height={32}
              alt="마지막 페이지"
            />
          </button>
        )}
      </div>
    </section>
  );
};

export default PageNation;
