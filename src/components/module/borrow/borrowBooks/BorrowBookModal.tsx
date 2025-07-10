import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  getErrorMessage,
  useCreateBorrowBookMutation,
} from "@/redux/api/baseApi";
import type { IBook, IBorrow } from "@/type";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IProps {
  book: IBook;
}

const BorrowBookModal = ({ book }: IProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const navigate = useNavigate();
  const [createBorrowBook] = useCreateBorrowBookMutation();

  //handle a borrow book
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      //check copies is greater than quantity
      if (
        book.copies >= data.quantity &&
        data.quantity > 0 &&
        data.dueDate !== undefined
      ) {
        const res = await createBorrowBook({
          bookId: book._id,
          borrowBookData: data as IBorrow,
        }).unwrap();
        if (res.success) {
          toast.success(res.message, {
            duration: 5000,
          });
          setOpen(false);
          form.reset();
          navigate("/borrow-summary", { replace: true });
        } else {
          toast.error(res.message, { duration: 5000 });
        }
      } else {
        if (data.quantity === undefined) {
          toast.error("quantity is 0, please select quantity 1 or more", {
            duration: 5000,
          });
        } else if (data.quantity <= 0) {
          toast.error("quantity never be 0, please select quantity 1 or more", {
            duration: 5000,
          });
        } else if (data.dueDate === undefined) {
          toast.error("due date is empty, please select a due date!", {
            duration: 5000,
          });
        } else {
          toast.error(
            `available copies: ${book.copies} but got quantity: ${data.quantity} please select ${book.copies} or less: ${book.copies}`,
            { duration: 5000 }
          );
        }
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (errorMessage) {
        const lastPartOfError = errorMessage.split(",").pop()?.trim();
        const cleanedMessage = lastPartOfError?.includes(":")
          ? lastPartOfError.split(":").slice(1).join(":").trim()
          : lastPartOfError;

        toast.error(cleanedMessage || "Something went wrong", {
          duration: 5000,
        });
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="cursor-pointer">
        {book.copies > 0 ? (
          <DialogTrigger asChild>
            <Button variant="default" className="bg-cyan-500 cursor-pointer">
              Borrow Book
            </Button>
          </DialogTrigger>
        ) : (
          <Button
            variant="default"
            className="text-red-600 cursor-not-allowed select-none"
          >
            Unavailable
          </Button>
        )}
      </div>

      <DialogContent>
        <DialogDescription className="sr-only">
          Submit this form..
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value || ""}
                      placeholder="Quantity number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select a Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-3">
              <Button className="cursor-pointer">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
