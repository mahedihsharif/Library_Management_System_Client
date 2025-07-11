import { Button } from "@/components/ui/button";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage, useUpdateBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/type";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IProps {
  book: IBook;
}

const BookUpdateModal = ({ book }: IProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const navigate = useNavigate();
  const [updateBook] = useUpdateBookMutation();

  useEffect(() => {
    if (open && book) {
      form.reset({
        title: book.title,
        description: book.description,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies,
      });
    }
  }, [open, book, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await updateBook({
        id: book._id,
        updatedBookData: data,
      }).unwrap();
      if (res.success) {
        toast.success(res.message, {
          duration: 5000,
        });
        setOpen(false);
        form.reset();
        navigate("/", { replace: true });
      } else {
        toast.error(res.message, { duration: 5000 });
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
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="cursor-pointer">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogDescription className="sr-only">
          Submit this form..
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* TITLE */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* AUTHOR */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* GENRE */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* ISBN */}
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* COPIES */}
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || 0} />
                  </FormControl>
                </FormItem>
              )}
            />

            {(() => {
              const currentCopies = form.watch("copies");
              const isAvailable = parseInt(currentCopies) > 0;

              return (
                <p
                  className={`text-sm font-medium ${
                    isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  Status: {isAvailable ? "Available" : "Unavailable"}
                </p>
              );
            })()}

            <DialogFooter className="mt-3">
              <Button className="cursor-pointer">Updated</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookUpdateModal;
