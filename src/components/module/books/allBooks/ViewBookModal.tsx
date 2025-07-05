import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetBookQuery } from "@/redux/api/baseApi";
import { Eye } from "lucide-react";

interface IProps {
  bookId: string;
}

const ViewBookModal = ({ bookId }: IProps) => {
  const { data: books } = useGetBookQuery(bookId);
  if (!books) return null;
  const { title, author, genre, isbn, copies, available } = books.data;
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
