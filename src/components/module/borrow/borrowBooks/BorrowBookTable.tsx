import { TableCell, TableRow } from "@/components/ui/table";
import type { IBookSummary } from "@/type";

interface IProps {
  borrowBook: IBookSummary;
}

const BorrowBookTable = ({ borrowBook }: IProps) => {
  const {
    totalQuantity,
    book: { title, isbn },
  } = borrowBook;
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell>{isbn}</TableCell>
      <TableCell>{totalQuantity}</TableCell>
    </TableRow>
  );
};

export default BorrowBookTable;
