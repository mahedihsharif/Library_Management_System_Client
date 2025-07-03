import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/type";
import { Trash2 } from "lucide-react";
import BookModal from "../allBooks/ViewBookModal";
import BookUpdateModal from "../updateBooks/BookUpdateModal";

interface IProps {
  book: IBook;
}

const BookTable = ({ book }: IProps) => {
  const [deleteBook] = useDeleteBookMutation();
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
      <TableCell className="flex justify-center items-center gap-2">
        <div>
          <BookModal bookId={book._id} />
        </div>
        <div>
          <BookUpdateModal book={book} />
        </div>
        <div>
          <Button
            variant="default"
            size="icon"
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => deleteBook(book._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button
            variant="default"
            className="text-amber-700 hover:text-red-700 cursor-pointer"
          >
            Borrow
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookTable;
