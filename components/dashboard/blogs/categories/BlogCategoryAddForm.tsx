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
import { useAddData } from "@/hooks/useAddData";
import { useFetchData } from "@/hooks/useFetchData";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Category } from "../../categories/CategoryColumn";

type Props = {
  blogSlug: string;
};

const formSchema = z.object({
  categoryId: z.string(),
});

const BlogCategoryAddForm = ({ blogSlug }: Props) => {
  const {
    data: categoriesData,
    isLoading,
    isSuccess,
  } = useFetchData({
    queryKey: ["categoriesData"],
    dataProtected: `categories`,
  });

  const categories = categoriesData?.data.categories;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutationAddBlogCategory = useAddData({
    queryKey: "blogData",
    dataProtected: `categories-on-blogs/${blogSlug}`,
    backUrl: `/dashboard/articles/${blogSlug}`,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutationAddBlogCategory.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Add Article Category</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isSuccess && categories && (
                          <>
                            {categories.map((category: Category) => {
                              return (
                                <SelectItem
                                  value={category.id}
                                  key={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              );
                            })}
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button variant={"yellowLTK"}>Save</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default BlogCategoryAddForm;
