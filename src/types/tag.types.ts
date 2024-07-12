export interface TagInputRef {
  getContent: () => HTMLDivElement | null;
  setContent: (newContent: string) => void;
  focus: () => void;
}

export interface Tag {
  id: number;
  name: string;
}
