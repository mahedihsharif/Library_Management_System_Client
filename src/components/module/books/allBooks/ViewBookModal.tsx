import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  getErrorMessage,
  getErrorMessageToReadData,
  useCreateBorrowBookMutation,
  useGetBookQuery,
} from "@/redux/api/baseApi";
import type { IBook, IBorrow } from "@/type";
import { format } from "date-fns";
import { CalendarIcon, Eye } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

interface IProps {
  book: IBook;
}

const ViewBookModal = ({ book }: IProps) => {
  const navigate = useNavigate();
  const form = useForm();
  const { data: books, isLoading, error } = useGetBookQuery(book._id);
  const [createBorrowBook] = useCreateBorrowBookMutation();

  if (!books) return null;
  const { title, author, genre, isbn, copies } = books.data;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    const errorMessage = getErrorMessageToReadData(error);
    return <p>Error: {errorMessage}</p>;
  }

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

                {/* check availability and updated */}
                {copies <= 0 ? (
                  <Button
                    disabled={true}
                    className="w-full mt-3 text-red-600 cursor-not-allowed select-none"
                  >
                    Unavailable to borrow
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    className="w-full mt-3 cursor-pointer"
                  >
                    Book Now
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBookModal;
