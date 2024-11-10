"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAddData } from "@/hooks/useAddData";
import { useFetchData } from "@/hooks/useFetchData";
import { useUpdateData } from "@/hooks/useUpdateData";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string(),
  role: z.string(),
  photo: z.any(),
});

const UserSettings = () => {
  const { data: myProfile, isSuccess } = useFetchData({
    queryKey: ["myProfile"],
    dataProtected: `users/me`,
  });

  const preLoadValues = {
    name: myProfile?.data.name,
    role: myProfile?.data.role,
    photo: myProfile?.data.photo,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preLoadValues || [],
  });

  const imageRef = form.register("photo");

  const mutationUpdateUserSettings = useUpdateData({
    queryKey: "myProfile",
    dataProtected: `users/${myProfile?.data.id}`,
    backUrl: `/dashboard/settings`,
    multipart: true,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const form = new FormData();

    if (values.photo.length > 0) {
      const appendIfNotNull = (key: string, value: any) => {
        if (value != null) {
          form.append(key, value);
        }
      };

      appendIfNotNull("name", values.name);
      appendIfNotNull("role", values.role);

      if (values.photo[0] !== undefined) {
        form.append("photo", values.photo[0]);
      }

      mutationUpdateUserSettings.mutate(form);
    } else {
      toast.error("Image should not be empty!");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Update User Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {myProfile?.data.role === "ADMINISTRATOR" && (
                          <SelectItem value="ADMINISTRATOR">
                            ADMINISTRATOR
                          </SelectItem>
                        )}
                        <SelectItem value="BLOGGER">BLOGGER</SelectItem>
                        <SelectItem value="MEMBER">MEMBER</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type="file" placeholder="Image" {...imageRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button variant={"blueLTK"}>Save</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default UserSettings;
