/* @flow */
import type { CategoryType } from '../types/CategoryType';

export default class Category {
  id: number;
  name: string;
  slug: string;

  constructor(obj: CategoryType) {
    this.id = obj.id;
    this.name = obj.name;
    this.slug = obj.slug;
  }
}
