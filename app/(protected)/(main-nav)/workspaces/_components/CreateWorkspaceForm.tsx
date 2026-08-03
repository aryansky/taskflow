"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import z from "zod";
import { createWorkspace } from "../../../workspaces/[id]/actions";
import { useRouter } from "next/navigation";
import { createWorkspaceSchema } from "@/app/(protected)/workspaces/[id]/schema";
import { Textarea } from "@/components/ui/textarea";

export default function CreateWorkspaceForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createWorkspaceSchema>>();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof createWorkspaceSchema>) => {
    const response = await createWorkspace(data);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof createWorkspaceSchema>, {
          type: "server",
          message: messages[0],
        });
      });
      return;
    }

    if (response.success) {
      onSuccess();
      reset();
      router.refresh();
    }
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <FieldError errors={[{ message: errors.name.message }]} />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="imageUrl">Image Url</FieldLabel>
            <Input id="imageUrl" {...register("imageUrl")} />
            {errors.imageUrl && (
              <FieldError errors={[{ message: errors.imageUrl.message }]} />
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <FieldError errors={[{ message: errors.description.message }]} />
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isSubmitting} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isSubmitting} type="submit">
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
