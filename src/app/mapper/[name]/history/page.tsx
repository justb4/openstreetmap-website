import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { User, UserData } from "@/types/user";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export function generateStaticParams() {
  return [{ name: "Tjuro" }];
}

export const metadata: Metadata = {
  title: "Mapper details",
  description: "De details van een mapper.",
};

export default async function AboutPage() {
  const response = await fetch(
    "https://www.openstreetmap.org/api/0.6/user/14792647",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  const userData: UserData = await response.json();

  if (!userData) {
    return notFound();
  }

  const user: User = userData.user;

  return <div>{user.changesets.count}</div>;
}