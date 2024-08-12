class Pagination {
  totalPages: number;
  currentPage: number;
  groupSize: number;

  constructor(
    totalPages: number,
    currentPage: number = 1,
    groupSize: number = 5,
  ) {
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.groupSize = groupSize;
  }

  // 현재 페이지가 속한 그룹의 시작 페이지 번호를 계산
  getStartPage(): number {
    return (
      Math.floor((this.currentPage - 1) / this.groupSize) * this.groupSize + 1
    );
  }

  // 현재 페이지가 속한 그룹의 끝 페이지 번호를 계산
  getEndPage(): number {
    const endPage = this.getStartPage() + this.groupSize - 1;
    return endPage > this.totalPages ? this.totalPages : endPage;
  }

  // 현재 그룹의 페이지 번호 목록을 반환
  getPageNumbers(): number[] {
    const startPage = this.getStartPage();
    const endPage = this.getEndPage();
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 다음 페이지가 있는지 확인
  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  // 이전 페이지가 있는지 확인
  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  // 다음 그룹이 있는지 확인
  hasNextGroup(): boolean {
    return this.getEndPage() < this.totalPages;
  }

  // 이전 그룹이 있는지 확인
  hasPreviousGroup(): boolean {
    return this.getStartPage() > 1;
  }

  // 다음 그룹의 첫 페이지 번호
  getNextGroupFirstPage(): number {
    return this.hasNextGroup() ? this.getEndPage() + 1 : this.totalPages;
  }

  // 이전 그룹의 첫 페이지 번호
  getPreviousGroupFirstPage(): number {
    return this.hasPreviousGroup() ? this.getStartPage() - this.groupSize : 1;
  }

  // 다음 페이지로 이동
  getNextPage(): number {
    return this.hasNextPage() ? this.currentPage + 1 : this.totalPages;
  }

  // 이전 페이지로 이동
  getPreviousPage(): number {
    return this.hasPreviousPage() ? this.currentPage - 1 : 1;
  }

  // 마지막 페이지로 이동
  getLastPage(): number {
    return this.totalPages;
  }
}

export default Pagination;
