import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Book {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly price?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Book>);
  static copyOf(source: Book, mutator: (draft: MutableModel<Book>) => MutableModel<Book> | void): Book;
}