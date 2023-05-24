import ItemContainer from "@/components/ItemContainer";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRef } from "react";

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
  const endRef = useRef(null);

  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>Stefan Jordan - Metrolina Greenhouses</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`flex flex-col min-h-screen ${inter.className}`}>
        <div className="flex">
          <Sidebar scroll={scrollToBottom} />
          <ItemContainer items={items} />
        </div>
        <div ref={endRef}></div>
      </main>
    </>
  );
}
