import _ from 'lodash';

interface ArticleModelCreator {
  title: string;
  slug: string;
  publishedDate: Date;
  createdDate: Date;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default class ArticleModel {
  title: string;
  slug: string;
  publishedDate: Date;
  createdDate: Date;

  year: number;
  month: number;

  path: string;
  url: string;

  constructor({
    title,
    slug,
    publishedDate,
    createdDate,
  }: ArticleModelCreator) {
    this.title = title;
    this.slug = slug;
    this.createdDate = new Date(createdDate);
    this.publishedDate = new Date(publishedDate);

    const constructedName = `${slug}`;

    const year = this.publishedDate.getFullYear();
    const month = this.publishedDate.getMonth();
    const monthLong = _.lowerCase(MONTHS[month]);

    this.path = `/posts/${constructedName}.md`;
    this.url = `${process.env.PUBLIC_URL}/posts/${year}/${monthLong}/${constructedName}.md`;

    this.year = year;
    this.month = month;
  }

  getPublishedDate() {
    return this.publishedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  getFormattedPublishedMonth() {
    return MONTHS[this.publishedDate.getMonth()];
  }
}