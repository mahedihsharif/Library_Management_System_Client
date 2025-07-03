export interface IBook {
  _id: string;
  title: string;
  description: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IBookCreate = Pick<
  IBook,
  "title" | "description" | "author" | "genre" | "isbn" | "copies"
>;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
