"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { updateTaskSchema } from "../../tasks/schema";
import { ChevronDownIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteTask, updateTask } from "../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function UpdateTaskForm({
  taskId,
  title,
  description,
  dueDate,
  assignedToEmail,
}: {
  taskId: string;
  title: string;
  description: string;
  dueDate: Date | null;
  assignedToEmail: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updateTaskSchema>>({
    defaultValues: {
      title: title,
      description: description,
      assignedToEmail: assignedToEmail,
      dueDate: dueDate,
    },
  });
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof updateTaskSchema>) {
    const response = await updateTask(taskId, data);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof updateTaskSchema>, {
          type: "server",
          message: messages[0],
        });
      });
      return;
    }

    if (response.success) {
      router.push(response.success.redirectPath);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="max-w-xl mx-auto">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              {...register("title")}
              id="title"
              placeholder="Title"
              autoComplete="off"
            />
            {errors.title && (
              <FieldError errors={[{ message: errors.title.message }]} />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...register("description")}
                id="description"
                placeholder="description"
                rows={6}
                className="min-h-24 resize-none"
              />
            </InputGroup>
            {errors.description && (
              <FieldError errors={[{ message: errors.description.message }]} />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...register("assignedToEmail")}
              id="email"
              placeholder="abc@test.com"
              autoComplete="off"
              type="email"
              disabled
            />
            {errors.assignedToEmail && (
              <FieldError
                errors={[{ message: errors.assignedToEmail.message }]}
              />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => {
                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        defaultMonth={field.value ?? undefined}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date <= today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
            {errors.dueDate && (
              <FieldError errors={[{ message: errors.dueDate.message }]} />
            )}
          </Field>
          <div className="flex gap-2 justify-between">
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
              type="submit"
            >
              Save Changes
            </Button>
            <div className="flex gap-2">
              {!isSubmitting && (
                <Link href={`/tasks/${taskId}`}>
                  <Button
                    type="button"
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    Go Back
                  </Button>
                </Link>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your task.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      type="button"
                      className="bg-red-700 hover:bg-red-800"
                      onClick={() => {
                        deleteTask(taskId);
                      }}
                    >
                      <Trash />
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
