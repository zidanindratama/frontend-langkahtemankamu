import { Event } from "@/components/dashboard/events/EventColumn";
import EventDetail from "@/components/main/events/EventDetail";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import Platforms from "@/components/main/Platforms";
import axiosInstance from "@/helpers/axioosInstance";
import { Metadata } from "next";
import React from "react";

type Param = {
  slug: string;
};

type Props = {
  params: Param;
};

export async function generateStaticParams() {
  try {
    const responseEvents = await axiosInstance.get(
      `/protected/events?isPaginated=false`
    );

    if (!responseEvents?.data?.events) {
      console.error("Events data is missing:", responseEvents?.data);
      return [];
    }

    const events = responseEvents.data.events as Event[];

    return events.map((event) => ({ slug: event.slug })).slice(0, 5);
  } catch (error) {
    console.error("Error fetching events for static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const responseEvent = await axiosInstance.get(
      `/protected/events/${params.slug}`
    );

    if (!responseEvent?.data) {
      console.error("Event data is missing:", responseEvent?.data);
      return {
        title: "Event not found",
        description: "Details of the event are unavailable.",
        openGraph: {
          images: [{ url: "" }],
        },
      };
    }

    const event = responseEvent.data as Event;

    return {
      title: event.title,
      description: event.shortDescription,
      openGraph: {
        images: [
          {
            url: event.image,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching event data for metadata:", error);
    return {
      title: "Event not found",
      description: "Details of the event are unavailable.",
      openGraph: {
        images: [{ url: "" }],
      },
    };
  }
}

const page = ({ params }: Props) => {
  return (
    <div>
      <Navbar />
      <EventDetail eventSlug={params.slug} />
      <Platforms />
      <Footer />
    </div>
  );
};

export default page;
