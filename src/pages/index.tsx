import ItemContainer from "@/components/ItemContainer";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { getItems, getItems2 } from "../utils/getItems";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { ItemType } from "@/components/Item";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });



export default function Home() {

  const { isLoading, isError, data, error } = useQuery({ queryKey: ['getItems'], queryFn: () => getItems2() })

  const endRef = useRef(null);

  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  data.sort((a, b) => a.itemKey - b.itemKey)

  return (
    <>
      <Head>
        <title>Stefan Jordan - Metrolina Greenhouses</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`flex flex-col min-h-screen ${inter.className}`}>
        <div className="flex">
          <Sidebar scroll={scrollToBottom} />
          <ItemContainer scroll={scrollToBottom} items={data} />
        </div>
        <div ref={endRef}></div>
      </main>
    </>
  );
}