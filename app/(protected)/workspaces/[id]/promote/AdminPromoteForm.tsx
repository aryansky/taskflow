"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { promoteToAdmin } from "./actions";
import { promoteToAdminSchema } from "./schema";
import { toast } from "sonner";
import { ButtonGroup } from "@/components/ui/button-group";

export default function AdminPromoteForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof promoteToAdminSchema>>();

  async function onSubmit(data: z.infer<typeof promoteToAdminSchema>) {
    const response = await promoteToAdmin(data);

    if (response.errors) {
      Object.entries(response.errors).forEach(([field, messages]) => {
        setError(field as keyof z.infer<typeof promoteToAdminSchema>, {
          type: "server",
          message: messages[0],
        });
      });
      return;
    }

    if (response.success) {
      toast.success("Admin promoted", {
        position: "bottom-center",
        description: `${response.success.email} is now an admin`,
      });
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <ButtonGroup>
            <Input
              {...register("userEmail")}
              id="email"
              placeholder="abc@test.com"
              autoComplete="off"
              type="email"
            />
            <Button
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
              type="submit"
            >
              Promote
            </Button>
          </ButtonGroup>

          {errors.userEmail && (
            <FieldError errors={[{ message: errors.userEmail.message }]} />
          )}
        </Field>
      </FieldGroup>
    </form>
  );
}
