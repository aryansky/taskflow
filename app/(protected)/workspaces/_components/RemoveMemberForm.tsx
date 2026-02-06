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
import { removeMemberSchema } from "../schema";
import z from "zod";
import { useRouter } from "next/navigation";
import { removeMember } from "../actions";
import { toast } from "sonner";

export default function RemoveMemberForm({
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
  } = useForm<z.infer<typeof removeMemberSchema>>();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof removeMemberSchema>) => {
    const response = await removeMember(workspaceId, data);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof removeMemberSchema>, {
          type: "server",
          message: messages[0],
        });
      });
      return;
    }

    if (response.success) {
      onSuccess();
      reset();
      toast.success("Member removed", {
        position: "bottom-center",
        description: `${data.email} has been removed from this workspace`,
      });
      router.refresh();
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Remove member</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" {...register("email")} />
            <FieldDescription>
              Remove a member by entering their email
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
          <Button disabled={isSubmitting} variant={"destructive"} type="submit">
            Remove
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
