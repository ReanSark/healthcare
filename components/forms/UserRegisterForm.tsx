"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RoleOptions } from "@/constants";
import { createUser } from "@/lib/actions/patient.actions";
import { UserRegisterFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Label } from "../ui/label";

export const UserRegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserRegisterFormValidation>>({
    resolver: zodResolver(UserRegisterFormValidation),
    defaultValues: {
      role: "Receptionist",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserRegisterFormValidation>) => {
      setIsLoading(true);
  
      try {
        const user = {
          role: values.role,
          name: values.name,
          email: values.email,
          password: values.password
        };
  
        const newUser = await createUser(user);
  
        if (newUser) {
          alert('Registration successful!');
          router.push(`/lol`);
          /* router.push(`/users/${newUser.$id}/login`); */
        }
      } catch (error) {
        console.log(error);
      }
  
      setIsLoading(false);
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <section className="mb-12 space-y-4">
            <h1 className="header">Register an account👋</h1>
            <p className="text-dark-700">Select your position to register.</p>
          </section>
  
          <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="role"
              label="Role"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {RoleOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
            
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
  
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
  
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="********"
            iconSrc="/assets/icons/password.svg"
            iconAlt="password"
          />
  
          <SubmitButton isLoading={isLoading}>Register</SubmitButton>
        </form>
      </Form>
    );
}
