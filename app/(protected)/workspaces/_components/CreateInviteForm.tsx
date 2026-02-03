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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { inviteSchema } from "../schema";
import z from "zod";
import { useRouter } from "next/navigation";
import { createInvite } from "../[id]/invites/actions";

export default function CreateInviteForm({
  onSuccess,
  workspaceId,
}: {
  onSuccess: () => void;
  workspaceId: string;
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof inviteSchema>>();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof inviteSchema>) => {
    const response = await createInvite(data, workspaceId);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof inviteSchema>, {
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
    <DialogContent className="sm:max-w-md">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Invite People</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" {...register("email")} />
            <FieldDescription>
              Invite a user by entering their email
            </FieldDescription>
            {errors.email && (
              <FieldError errors={[{ message: errors.email.message }]} />
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
            Invite
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
