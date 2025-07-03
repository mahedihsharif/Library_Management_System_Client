import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { Eye } from "lucide-react";

interface IProps {
  bookId: string;
}

const ViewBookModal = ({ bookId }: IProps) => {
  const { data: books } = useGetBooksQuery(undefined);
  const singleBook = books?.data.find((book) => book._id === bookId);
  if (!singleBook) return null;
  const { title, author, genre, isbn, copies, available } = singleBook;
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Eye className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <p className="font-medium text-gray-500 text-md">
              author: <span>{author}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium text-md">
              Genre:
              <span className="text-sm"> {genre}</span>
            </p>
            <p className="font-medium text-md">
              ISBN:
              <span className="text-sm"> {isbn}</span>
            </p>
            <p className="font-medium text-md">
              Available Copies:
              <span className="text-sm"> {copies}</span>
            </p>
            <p className="font-medium text-md">
              Availability:
              <span
                className={
                  available ? "text-green-600  text-sm" : "text-red-500 text-sm"
                }
              >
                {available ? " Available" : " Unavailable"}
              </span>
            </p>
            <Button
              disabled={!available || copies === 0}
              //   onClick={onBook}
              className="w-full mt-3"
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBookModal;
