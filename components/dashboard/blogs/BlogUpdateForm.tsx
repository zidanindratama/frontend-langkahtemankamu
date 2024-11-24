"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useCallback, useEffect, useRef } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { useUpdateData } from "@/hooks/useUpdateData";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string(),
  coverImage: z.any(),
  featured: z.string(),
  shortDescription: z.string(),
  content: z.string(),
});

type Props = {
  slug: string;
};

const BlogUpdateForm = ({ slug }: Props) => {
  const { data: blogData, isSuccess } = useFetchData({
    queryKey: ["blogData"],
    dataProtected: `blogs/${slug}`,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      content: "",
      coverImage: null,
    },
  });

  const { reset } = form;
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (isSuccess && blogData) {
      reset({
        title: blogData.data.title || "",
        shortDescription: blogData.data.shortDescription || "",
        content: blogData.data.content || "",
        featured: blogData.data.featured === true ? "true" : "false",
        coverImage: blogData.data.image || null,
      });
      if (editorRef.current) {
        editorRef.current.commands.setContent(blogData.data.content || "");
      }
    }
  }, [blogData, isSuccess, reset]);

  const coverImageRef = form.register("coverImage");

  const mutationUpdateBlog = useUpdateData({
    queryKey: "blogData",
    dataProtected: `blogs/${slug}`,
    backUrl: `/dashboard/blogs/${slug}`,
    multipart: true,
  });

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      editorRef.current = editor;
      editor.on("update", () => {
        form.setValue("content", editor.getHTML());
      });
    },
    [form]
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const form = new FormData();

    const isFileList =
      values.coverImage instanceof FileList && values.coverImage.length > 0;

    const appendIfNotNull = (key: string, value: any) => {
      if (value != null) {
        form.append(key, value);
      }
    };

    appendIfNotNull("title", values.title);
    appendIfNotNull("shortDescription", values.shortDescription);
    appendIfNotNull("featured", values.featured);
    appendIfNotNull("content", values.content);

    if (isFileList) {
      form.append("image", values.coverImage[0]);
    } else if (typeof values.coverImage === "string") {
      appendIfNotNull("image", values.coverImage);
    }

    mutationUpdateBlog.mutate(form);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Update Blog</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Cover Image"
                        {...coverImageRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select feature" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Featured</SelectItem>
                        <SelectItem value="false">Not Featured</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Deescription</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about this blog"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={() => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        className="max-w-[18.5rem] sm:max-w-[24rem] lg:max-w-full"
                        editorContentClassName="p-5"
                        output="html"
                        placeholder="Type your description here..."
                        onCreate={handleCreate}
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-none"
                      />
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

export default BlogUpdateForm;
