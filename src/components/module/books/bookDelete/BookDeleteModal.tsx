import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IProps {
  bookId: string;
}

const BookDeleteModal = ({ bookId }: IProps) => {
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();
  const handleDeleted = async (id: string) => {
    const res = await deleteBook(id).unwrap();
    if (res.success) {
      toast.success(res.message, {
        duration: 5000,
      });
      navigate("/", { replace: true });
    } else {
      toast.error(res.message, { duration: 5000 });
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="default"
          size="icon"
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want to delete the book?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="default"
            onClick={() => handleDeleted(bookId)}
            className="cursor-pointer"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookDeleteModal;
