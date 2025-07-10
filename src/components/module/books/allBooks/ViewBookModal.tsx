import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getErrorMessageToReadData,
  useGetBookQuery,
} from "@/redux/api/baseApi";
import { Eye } from "lucide-react";

interface IProps {
  bookId: string;
}

const ViewBookModal = ({ bookId }: IProps) => {
  const { data: books, isLoading, error } = useGetBookQuery(bookId);
  if (!books) return null;
  const { title, author, genre, isbn, copies } = books.data;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    const errorMessage = getErrorMessageToReadData(error);
    return <p>Error: {errorMessage}</p>;
  }
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
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
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
                  copies > 0
                    ? "text-green-600  text-sm"
                    : "text-red-500 text-sm"
                }
              >
                {copies > 0 ? " Available" : " Unavailable"}
              </span>
            </p>
            {copies <= 0 ? (
              <Button
                disabled={true}
                className="w-full mt-3 text-red-600 cursor-not-allowed select-none"
              >
                Unavailable to borrow
              </Button>
            ) : (
              <Button variant="default" className="w-full mt-3 cursor-pointer">
                Book Now
              </Button>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBookModal;
