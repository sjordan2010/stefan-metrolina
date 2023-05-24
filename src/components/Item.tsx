import {
  ChevronDownIcon,
  ChevronUpIcon,
  XCircleIcon,
  PencilSquareIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleDelete = () => {
    setShowDelete(true);

  };
  const handleEdit = () => {
    setShowEdit(true);

  };

  return (
    <>
    <div className="item-shadow flex flex-col w-full bg-white transition duration-100 hover:bg-gray-100 hover:cursor-pointer">
      <div
        className={`w-full h-fit min-h-24 border ${
          !isExpanded ? "rounded-b-md" : ""
        } rounded-t-md flex px-4 py-4 gap-2 md:gap-4 text-sm md:text-base`}
      >
        <div className="h-full">
          <div className="h-full flex flex-col justify-around">
            <XCircleIcon
                onClick={handleDelete}
              className="text-red-600 transition duration-150 hover:scale-110 hover:brightness-95 hover:cursor-pointer"
              width={30}
              data-tooltip-id="deleteItem"
              data-tooltip-content="Delete this item"
            />
            <PencilSquareIcon
                onClick={handleEdit}
              className="text-yellow-500 transition duration-150 hover:scale-110 hover:brightness-90 hover:cursor-pointer"
              width={30}
              data-tooltip-id="editItem"
              data-tooltip-content="Edit this item"
            />
          </div>
        </div>
        <div onClick={handleExpand} className="flex flex-col gap-2 md:gap-4 lg:gap-10 lg:pl-6 md:flex-row w-full items-end justify-around md:justify-between"   data-tooltip-id="expandItem"
              data-tooltip-content="Expand to see locations">
          <div className="flex flex-col justify-around gap-2 w-full md:min-w-28 md:ml-2 text-center md:text-left">
            <p>
              <span className="font-bold text-gray-500">ITEM #: </span>
              {item.itemNumber}
            </p>
            <p className="italic">{item.itemDesc}</p>
            <div className="flex justify-center md:justify-start gap-1 md:gap-4 text-xs text-gray-400">
              <p className="">Locations: {item.locations.length}</p>
              <p className="">
                Total: {item.locations.reduce((acc, curr) => acc + curr.onHandQty, 0)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap md:flex-col md:h-full w-full justify-around text-left md:text-right md:py-3">
            <p>
              <span className="font-bold text-gray-500">SKU: </span> {item.sku}
            </p>
            <p>
              <span className="font-bold text-gray-500">UPC: </span> {item.upc}
            </p>
          </div>
          <div className="w-full md:w-fit min-h-fit md:h-full flex items-center justify-center transition duration-150 hover:animate-bounce">
            {!isExpanded ? <ChevronDownIcon width={25} /> : <ChevronUpIcon width={25} />}
          </div>
        </div>
        {/* <Tooltip id="expandLocation" variant="info" place="left" /> */}
        <Tooltip id="editItem" variant="warning" />
        {/* <Tooltip id="expandItem" variant="dark" /> */}
      </div>
      <div
        className={`${!isExpanded ? "hidden" : ""} w-full h-fit px-2 py-2 bg-gray-200 rounded-b-sm text-xs divide-y-2 divide-gray-400`}
      >
        {isExpanded &&
          item.locations.map((location, index) => {
            return (
              <div className="w-full flex items-center gap-4 lg:gap-10 py-2 mb-2 lg:text-base lg:px-10" key={location.locationId + index}>
                <MapPinIcon width={20} className="text-green-600"/>
                <p><span className="italic">Location ID: </span> {location.locationId}</p>
                <p><span className="italic">Quantity on Hand: </span> {location.onHandQty}</p>
              </div>
            );
          })}
      </div>
      
      <Tooltip id="deleteItem" variant="error" />
    </div>
      {showDelete && <DeleteModal item={item} setShowDelete={setShowDelete} />}
      {showEdit && <EditModal item={item} setShowEdit={setShowEdit} />}
      </>
  );
}
