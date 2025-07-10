import type { IBook } from "@/type";
import BorrowBookModal from "../../borrow/borrowBooks/BorrowBookModal";
import BookDeleteModal from "../bookDelete/BookDeleteModal";
import BookUpdateModal from "../updateBooks/BookUpdateModal";
import ViewBookModal from "./ViewBookModal";

interface IProps {
  book: IBook;
}

const BookTable = ({ book }: IProps) => {
  return (
    <tr className="hover:bg-gray-800 transition border-b border-gray-700">
      <td className="p-3">{book.title}</td>
      <td className="p-3">{book.author}</td>
      <td className="p-3 uppercase">{book.genre}</td>
      <td className="p-3">{book.isbn}</td>
      <td className="p-3">{book.copies}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 text-sm rounded-md ${
            book.copies > 0
              ? "bg-green-200 text-green-900"
              : "bg-red-200 text-red-900"
          }`}
        >
          {book.copies > 0 ? "Available" : "Unavailable"}
        </span>
      </td>
      <td className="p-3 flex flex-wrap gap-2">
        <ViewBookModal book={book} />
        <BookUpdateModal book={book} />
        <BookDeleteModal bookId={book._id} />
        <BorrowBookModal book={book} />
      </td>
    </tr>
  );
};

export default BookTable;
