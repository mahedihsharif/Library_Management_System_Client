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

export interface IBorrow {
  quantity: number;
  dueDate: string;
}

export interface ICreateBorrowArg {
  bookId: string;
  borrowBookData: IBorrow;
}

export interface IBookSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface IError {
  data: {
    success: boolean;
    message: string;
  };
}
