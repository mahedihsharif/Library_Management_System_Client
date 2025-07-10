import { Button } from "@/components/ui/button";
import {
  getErrorMessageToReadData,
  useGetBooksQuery,
} from "@/redux/api/baseApi";
import type { IBook } from "@/type";
import { useState } from "react";
import BookTable from "./BookTable";

const AllBooks = () => {
  const { data: books, error, isLoading } = useGetBooksQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    const errorMessage = getErrorMessageToReadData(error);
    return <p>Error: {errorMessage}</p>;
  }

  const itemsPerPage = 5;

  const totalPages = Math.ceil(books?.data?.length ?? 0);
  const paginatedBooks = books?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 bg-black text-white rounded-xl w-full">
      <h2 className="text-center text-2xl font-semibold mb-4">
        Our <span className="text-cyan-400 font-bold">Book Store</span>
      </h2>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 font-medium">Title</th>
              <th className="p-3 font-medium">Author</th>
              <th className="p-3 font-medium">Genre</th>
              <th className="p-3 font-medium">ISBN</th>
              <th className="p-3 font-medium">Copies</th>
              <th className="p-3 font-medium">Availability</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              paginatedBooks?.map((book: IBook) => (
                <BookTable key={book._id} book={book} />
              ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        <Button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
        >
          Prev
        </Button>

        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllBooks;
