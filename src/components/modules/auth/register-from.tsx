"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
//   FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import {  RotateCcwKey, UserPlus2, } from "lucide-react";
// import { redirect } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(4, "This field is required."),
  email: z.email(),
  password: z.string().min(8, "The field need at least 08."),
     callbackURL:z.url()
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      callbackURL: "http://localhost:3000",
  
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Creating User...");
      try {
        const { data, error } = await authClient.signUp.email(value);
        console.log({ data, error });
        if (error) {
          toast.error(error.message, { id: toastID });
          return;
        }
        toast.success("User Created Successfully!", { id: toastID })
        ;
        // redirect(`${process.env.FRONTEND_URL}`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Something Went Wrong!", { id: toastID });
      }
    },
  });

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
    console.log(data);
  };

  return (
    <div className="w-2xl flex flex-col gap-5">
      <Card {...props} className="bg-transparent! border-0">
        <CardHeader>
          <CardTitle className="text-3xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="register-from"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(e);
            }}
          >
            <FieldGroup>
              <form.Field name="name">
                {(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        id={field.name}
                        type="text"
                        placeholder="John Doe"
                      />
                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="email">
                {(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        id={field.name}
                        type="email"
                        placeholder="johndoe@example.com"
                      />{" "}
                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="password">
                {(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        id={field.name}
                        type="password"
                        placeholder="password1223"
                      />{" "}
                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
               <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex items-center gap-5">
          <Button form="register-from" type="submit">
            <UserPlus2 /> Create Account
          </Button>
         
        </CardFooter>
      </Card>
      <div className="flex items-center justify-end gap-5 mt-6">
        
        <Button
          variant={"ghost"}
          className="border w-55 h-17 px-5 py-4 text-md font-semibold rounded-full gap-3 items-center"
        >
          <RotateCcwKey /> Reset Password
        </Button>
      </div>
    </div>
  );
}