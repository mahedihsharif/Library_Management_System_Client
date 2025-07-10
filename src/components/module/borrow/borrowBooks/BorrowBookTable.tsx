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
    <tr className="hover:bg-gray-800 transition border-b border-gray-700">
      <td className="p-3">{title}</td>
      <td className="p-3">{isbn}</td>
      <td className="p-3">{totalQuantity}</td>
    </tr>
  );
};

export default BorrowBookTable;
