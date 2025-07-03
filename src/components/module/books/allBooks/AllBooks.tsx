import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/type";
import BookTable from "../addBooks/BookTable";

const AllBooks = () => {
  const { data: books, error, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <h1 className="text-center text-2xl font-bold font-serif">
        Our <span className="text-cyan-400">Book Store</span>
      </h1>

      <CardContent className="py-4">
        <ScrollArea className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                books?.data.map((book: IBook) => (
                  <BookTable key={book._id} book={book} />
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AllBooks;
