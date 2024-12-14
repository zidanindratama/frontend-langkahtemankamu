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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useAddData } from "@/hooks/useAddData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Content, Editor } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useFetchData } from "@/hooks/useFetchData";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useUpdateData } from "@/hooks/useUpdateData";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required." }),
  content: z.string().min(1, { message: "Content is required." }),
  location: z.string().optional(),
  onlineUrl: z.string().url({ message: "Must be a valid URL." }).optional(),
  startEvent: z.coerce.date(),
  image: z.any().optional(),
});

type Props = {
  slug: string;
};

const EventUpdateForm = ({ slug }: Props) => {
  const { data: eventData, isSuccess } = useFetchData({
    queryKey: ["eventData"],
    dataProtected: `events/${slug}`,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: eventData?.data.title,
      shortDescription: eventData?.data.shortDescription,
      content: eventData?.data.content,
      image: eventData?.data.image,
      location: eventData?.data.location,
      onlineUrl: eventData?.data.onlineUrl,
      startEvent: eventData?.data.startEvent,
    },
  });

  const { reset } = form;
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (isSuccess && eventData) {
      if (editorRef.current) {
        editorRef.current.commands.setContent(eventData.data.content || "");
      }
    }
  }, [eventData]);

  const imageRef = form.register("image");

  const mutationUpdateBlog = useUpdateData({
    queryKey: "eventsData",
    dataProtected: `events/${slug}`,
    backUrl: `/dashboard/events`,
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
      values.image instanceof FileList && values.image.length > 0;

    const appendIfNotNull = (key: string, value: any) => {
      if (value != null) {
        form.append(key, value);
      }
    };

    appendIfNotNull("title", values.title);
    appendIfNotNull("content", values.content);
    appendIfNotNull("shortDescription", values.shortDescription);
    appendIfNotNull("location", values.location);
    appendIfNotNull("startEvent", values.startEvent);
    appendIfNotNull("onlineUrl", values.onlineUrl);

    if (isFileList) {
      form.append("image", values.image[0]);
    } else if (typeof values.image === "string") {
      appendIfNotNull("image", values.image);
    }

    mutationUpdateBlog.mutate(form);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Add Event</CardTitle>
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
                name="image"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="startEvent"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about this articles"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="onlineUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event URL</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Event URL"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Event Location" {...field} />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {form.watch("location") && (
                <div className="mt-4">
                  <iframe
                    className="w-full h-72"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=${
                      process.env.NEXT_PUBLIC_GMAPS_API_KEY
                    }&q=${encodeURIComponent(
                      form.watch("location")!
                    )}&zoom=15&maptype=roadmap`}
                  ></iframe>
                </div>
              )}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        {...field}
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

export default EventUpdateForm;
