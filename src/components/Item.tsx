import {
  ChevronDownIcon,
  ChevronUpIcon,
  XCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

interface ItemProps {
  item: ItemType;
}

export type ItemType = {
  //   itemKey: number;
  itemDesc: string;
  itemNumber: string;
  sku: string;
  upc: string;
  locations: { locationId: string; onHandQty: number }[];
};

export default function Item({ item }: ItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full h-fit min-h-24 border rounded-md shadow-md flex justify-between px-1 md:px-4 py-4 bg-white gap-2 md:gap-4 text-xs md:text-base">
      <div className="flex flex-col justify-around">
        <XCircleIcon
          //   onClick={handleDelete}
          className="text-red-500 transition duration-150 hover:scale-110 hover:text-red-600 hover:cursor-pointer"
          width={30}
          data-tooltip-id="deleteItem"
          data-tooltip-content="Delete this item"
        />
        <PencilSquareIcon
          //   onClick={handleEdit}
          className="text-yellow-500 transition duration-150 hover:scale-110 hover:brightness-90 hover:cursor-pointer"
          width={30}
          data-tooltip-id="editItem"
          data-tooltip-content="Edit this item"
        />
      </div>
      <div className="flex flex-col justify-around items-start gap-2">
        <p><span className="font-bold text-gray-500">ITEM #: </span>{item.itemNumber}</p>
        <p>{item.itemDesc}</p>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-xs text-gray-400">
          <p className="">Locations: {item.locations.length}</p>
          <p className="">
            Total: {item.locations.reduce((acc, curr) => acc + curr.onHandQty, 0)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-around text-right">
        
        <p><span className="font-bold text-gray-500">SKU: </span> {item.sku}</p>
        <p><span className="font-bold text-gray-500">UPC: </span> {item.upc}</p>
      </div>
      <div className="flex items-center justify-center">
        {!isExpanded ? (
          <ChevronDownIcon  width={25} />
        ) : (
          <ChevronUpIcon  width={25} />
        ) }
      </div>
      <Tooltip id="deleteItem" variant="error" />
      <Tooltip id="expandLocation" variant="info" place="left" />
      <Tooltip id="editItem" variant="warning" />
    </div>
  );
}
