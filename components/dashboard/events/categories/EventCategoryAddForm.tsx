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
  eventSlug: string;
};

const formSchema = z.object({
  eventCategoryId: z.string(),
});

const EventCategoryAddForm = ({ eventSlug }: Props) => {
  const {
    data: eventCategoriesData,
    isLoading,
    isSuccess,
  } = useFetchData({
    queryKey: ["eventCategoriesData"],
    dataProtected: `event-categories`,
  });

  const eventCategories = eventCategoriesData?.data.eventCategories;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutationAddEventCategory = useAddData({
    queryKey: "blogData",
    dataProtected: `event-categories-on-events/${eventSlug}`,
    backUrl: `/dashboard/events/${eventSlug}`,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutationAddEventCategory.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Add Event Category</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="eventCategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isSuccess && eventCategories && (
                          <>
                            {eventCategories.map((category: Category) => {
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

export default EventCategoryAddForm;
