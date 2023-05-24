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

const items = [
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [
      {
        locationId: "HD0723",
        onHandQty: 40,
      },
      {
        locationId: "HD0732",
        onHandQty: 35,
      },
    ],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [
      {
        locationId: "HD0723",
        onHandQty: 40,
      },
    ],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small Birdhouse Gazebo Small Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [
      {
        locationId: "HD0723",
        onHandQty: 40,
      },
    ],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [
      {
        locationId: "HD0723",
        onHandQty: 40,
      },
    ],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [],
  },
  {
    itemNumber: "78414",
    itemDesc: "Birdhouse Gazebo Small",
    upc: "0759834560012",
    sku: "1005909526",
    locations: [],
  },
];

export default function Home() {
  // const [allItems, setAllItems] = useState();
  // const queryClient = useQueryClient()

  // useEffect(() => {
  //   const useEffectData = Promise.resolve(getItems2())
  //   console.log('useEffectData', useEffectData)
  // }, []);

  // Queries
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
          <ItemContainer items={data} />
        </div>
        <div ref={endRef}></div>
      </main>
    </>
  );
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   const allItems = await queryClient.prefetchQuery({
//     queryKey: ["getItems"],
//     queryFn: () => getItems(),
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
