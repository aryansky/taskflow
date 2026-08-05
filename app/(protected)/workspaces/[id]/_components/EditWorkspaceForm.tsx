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

import { useForm, useWatch } from "react-hook-form";
import { updateWorkspaceSchema } from "../schema";
import z from "zod";
import { updateWorkspace } from "../actions";
import { useRouter } from "next/navigation";
import WorkspaceImage from "@/app/(protected)/(main-nav)/workspaces/_components/WorkspaceImage";
import { Textarea } from "@/components/ui/textarea";

export default function EditWorkspaceForm({
  onSuccess,
  workspaceId,
  workspaceName,
  workspaceImageUrl,
  workspaceDescription,
}: {
  onSuccess: () => void;
  workspaceId: string;
  workspaceName: string;
  workspaceImageUrl: string | null;
  workspaceDescription: string | null;
}) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updateWorkspaceSchema>>({
    defaultValues: {
      name: workspaceName,
      imageUrl: workspaceImageUrl ?? undefined,
      description: workspaceDescription ?? undefined,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof updateWorkspaceSchema>) => {
    const response = await updateWorkspace(data, workspaceId);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof updateWorkspaceSchema>, {
          type: "server",
          message: messages[0],
        });
      });
      return;
    }

    if (response.success) {
      onSuccess();
      router.refresh();
    }
  };

  const imageSrc = useWatch({
    control,
    name: "imageUrl",
    defaultValue: workspaceImageUrl ?? "",
  });

  return (
    <DialogContent className="sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Update Workspace</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <div className="w-full h-[125] flex justify-center my-2">
            <WorkspaceImage size={125} imageUrl={imageSrc ?? null} />
          </div>
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
            <Textarea
              className="max-h-[200]"
              id="description"
              {...register("description")}
            />
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
            Update
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
