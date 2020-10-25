interface ArticleModelCreator {
  title: string;
  slug: string;
  publishedDate: Date;
  createdDate: Date;
  dailyArticleCount: number;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default class ArticleModel {
  title: string;
  slug: string;
  publishedDate: Date;
  createdDate: Date;
  dailyArticleCount: number;

  year: number;
  month: number;

  path: string;
  url: string;

  constructor({
    title,
    slug,
    publishedDate,
    createdDate,
    dailyArticleCount
  }: ArticleModelCreator) {
    this.title = title;
    this.slug = slug;
    this.createdDate = new Date(createdDate);
    this.publishedDate = new Date(publishedDate);
    this.dailyArticleCount = dailyArticleCount;

    const constructedName = `${slug}`;

    this.path = `/posts/${constructedName}`;
    this.url = `${process.env.PUBLIC_URL}/posts/${constructedName}.md`;

    this.year = this.publishedDate.getUTCFullYear();
    this.month = this.publishedDate.getUTCMonth();
  }

  getPublishedDate() {
    return this.publishedDate.toISOString().split('T')[0]
  }

  getFormattedPublishedMonth() {
    return MONTHS[this.publishedDate.getUTCMonth()];
  }
}