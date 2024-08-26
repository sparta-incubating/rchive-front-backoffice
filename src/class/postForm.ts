import { PostType } from '@/types/posts.types';

export class PostForm {
  postType: PostType;
  title: string;
  tagNameList: string[] | undefined;
  tutorId: number;
  postPeriod: number;
  isOpened: boolean;
  uploadedAt: string;
  content: string | undefined;
  contentLink: string | undefined;
  videoLink: string | undefined;
  thumbnailUrl: string | undefined;

  constructor(
    postType: PostType,
    title: string,
    tagNameList: string[] | undefined,
    tutorId: number,
    postPeriod: number,
    isOpened: boolean,
    uploadedAt: string,
    content: string | undefined,
    contentLink: string | undefined,
    videoLink: string | undefined,
    thumbnailUrl: string | undefined,
  ) {
    this.postType = postType;
    this.title = title;
    this.tagNameList = tagNameList;
    this.tutorId = tutorId;
    this.postPeriod = postPeriod;
    this.isOpened = isOpened;
    this.uploadedAt = uploadedAt;
    this.content = content;
    this.contentLink = contentLink;
    this.videoLink = videoLink;
    this.thumbnailUrl = thumbnailUrl;
  }
}
