"use client";

import { useForm } from "react-hook-form";
import { commentSchema } from "../schema";
import z from "zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { createComment } from "../[taskId]/comments/actions";

export default function CreateCommentForm({ taskId }: { taskId: string }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof commentSchema>>();

  async function onSubmit(data: z.infer<typeof commentSchema>) {
    const response = await createComment(taskId, data);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof commentSchema>, {
          type: "server",
          message: messages[0],
        });
      });
      return;
    }

    if (response.success) {
      reset();
      return true;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <InputGroup>
            <InputGroupTextarea
              {...register("text")}
              id="text"
              placeholder="Comment"
              rows={8}
              className="min-h-16 resize-none"
            />
          </InputGroup>
          {errors.text && (
            <FieldError errors={[{ message: errors.text.message }]} />
          )}
          <div className="flex justify-end">
            <Button
              variant="default"
              size="sm"
              disabled={isSubmitting}
              type="submit"
            >
              Post Comment
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
