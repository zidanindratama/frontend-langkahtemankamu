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
import { useUpdateData } from "@/hooks/useUpdateData";

type Props = {
  blogSlug: string;
  blogCategoryId: string;
};

const formSchema = z.object({
  categoryId: z.string(),
});

const BlogCategoryUpdateForm = ({ blogSlug, blogCategoryId }: Props) => {
  const {
    data: categoriesData,
    isLoading,
    isSuccess,
  } = useFetchData({
    queryKey: ["categoriesData"],
    dataProtected: `categories`,
  });

  const { data: blogCategoryData } = useFetchData({
    queryKey: ["blogCategoryData"],
    dataProtected: `categories-on-blogs/get/${blogCategoryId}`,
  });

  const categories = categoriesData?.data.categories;
  console.log(`categories-on-blogs/get/${blogCategoryId}`);

  const preLoadValues = {
    categoryId: blogCategoryData?.data.categoryId,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preLoadValues || [],
  });

  const mutationUpdateBlogCategory = useUpdateData({
    queryKey: "blogData",
    dataProtected: `categories-on-blogs/${blogCategoryId}`,
    backUrl: `/dashboard/articles/${blogSlug}`,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutationUpdateBlogCategory.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Update Article Category</CardTitle>
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
              <Button variant={"blueLTK"}>Save</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default BlogCategoryUpdateForm;
