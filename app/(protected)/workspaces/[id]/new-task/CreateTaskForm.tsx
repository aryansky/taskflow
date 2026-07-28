"use client";
import { Button } from "@/components/ui/button";
import { createTask } from "./actions";
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
import { createTaskSchema } from "@/app/(protected)/tasks/schema";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CreateTaskForm({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createTaskSchema>>();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof createTaskSchema>) {
    const response = await createTask(data, workspaceId);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof createTaskSchema>, {
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
        <FieldGroup>
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
          <div className="flex justify-start mt-4">
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
