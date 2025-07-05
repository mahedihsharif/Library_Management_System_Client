import { TableCell, TableRow } from "@/components/ui/table";
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
    <TableRow>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell>{book.genre}</TableCell>
      <TableCell>{book.isbn}</TableCell>
      <TableCell>{book.copies}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            book.available
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {book.available ? "Available" : "Unavailable"}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex justify-center items-center gap-2">
          <ViewBookModal bookId={book._id} />
          <BookUpdateModal book={book} />
          <BookDeleteModal bookId={book._id} />
          <BorrowBookModal book={book} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookTable;
