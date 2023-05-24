import Image from "next/image";
import CreateForm from "./CreateForm";
import Link from "next/link";
import { PlusCircleIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

export default function Sidebar() {
  const [fullSidebar, setFullSidebar] = useState<boolean>(false);

  const handleSidebar = () => {
    setFullSidebar(true);
  };

  return (
    <>
      <aside className="fixed -left-96 md:left-0 bg-gray-200 item-shadow px-8 h-screen w-96 md:z-50">
        <Image
          className="mb-16"
          alt="Metrolina Greenhouses logo"
          src="MetrolinaGreenhouses_logo.svg"
          width={300}
          height={50}
        />
        <CreateForm />
        {fullSidebar && <ChevronLeftIcon className="absolute" width={250} />}
      </aside>
      <aside className="fixed bg-gray-200 h-screen w-16 item-shadow pt-5 flex flex-col items-center gap-10">
        <Link
          className="transition duration-100 hover:scale-110"
          href="https://www.metrolinagreenhouses.com"
          target="_blank"
        >
          <Image
            alt="Metrolina Greenhouses logo"
            src="/MG_small_logo.png"
            width={50}
            height={100}
          />
        </Link>
        <PlusCircleIcon
          onClick={handleSidebar}
          width={50}
          className="text-green-600 hover:cursor-pointer transition duration-100 hover:scale-110"
          data-tooltip-id="addItem"
          data-tooltip-content="Add an item"
        />
      </aside>
      <Tooltip id="addItem" variant="success" place="right" />
    </>
  );
}
