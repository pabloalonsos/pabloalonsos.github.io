import _ from 'lodash';

interface ArticleModelCreator {
  title: string;
  slug: string;
  publishedDate: Date;
  createdDate: Date;
  tags: string[];
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default class ArticleModel {
  title: string;
  slug: string;
  publishedDate: Date|null;
  createdDate: Date;
  tags: string[];
  isDraft: boolean;

  year: number;
  month: number;

  path: string;
  url: string;

  constructor({
    title,
    slug,
    publishedDate,
    createdDate,
    tags,
  }: ArticleModelCreator) {
    const articleType = process.env.REACT_APP_ARTICLE_TYPE === 'post' ? 'posts' : 'drafts';

    const isDraft = !publishedDate;
    this.title = title;
    this.slug = slug;
    this.createdDate = new Date(createdDate);
    this.publishedDate = !isDraft ? new Date(publishedDate) : null;
    this.tags = tags;
    this.isDraft = isDraft;

    const constructedName = `${slug}`;

    const relevantDate = isDraft ? this.createdDate : this.publishedDate;
    // @ts-ignore
    const year = relevantDate.getFullYear();
    // @ts-ignore
    const month = relevantDate.getMonth();
    const monthLong = _.lowerCase(MONTHS[month]);

    this.path = `/${articleType}/${constructedName}.md`;
    this.url = `${process.env.PUBLIC_URL}/${articleType}/${year}/${monthLong}/${constructedName}.md`;

    this.year = year;
    this.month = month;
  }

  getPublishedDate() {
    const relevantDate = this.isDraft ? this.createdDate : this.publishedDate;
    return relevantDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  getFormattedPublishedMonth() {
    const relevantDate = this.isDraft ? this.createdDate : this.publishedDate;
    // @ts-ignore
    return MONTHS[relevantDate.getMonth()];
  }
}