import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowBooksQuery } from "@/redux/api/baseApi";
import BorrowBookTable from "./BorrowBookTable";

const BorrowBookSummary = () => {
  const { data: borrowBooks, isLoading } = useGetBorrowBooksQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="w-full">
      <h1 className="text-center text-2xl font-bold font-serif">
        Borrow <span className="text-amber-600">Summary</span>
      </h1>

      <CardContent className="py-4">
        <ScrollArea className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Total Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                borrowBooks?.data.map((borrowBook, index) => (
                  <BorrowBookTable key={index} borrowBook={borrowBook} />
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BorrowBookSummary;
