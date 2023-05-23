import Header from "@/components/Header";
import ItemContainer from "@/components/ItemContainer";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import { Children } from "react";

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
  return (
    <main className={`flex flex-col min-h-screen ${inter.className}`}>
      <Header />
      <div className="flex">
        <Sidebar>{Children}</Sidebar>
        <ItemContainer items={items} />
      </div>
    </main>
  );
}
