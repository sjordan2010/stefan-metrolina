import Image from "next/image";
import CreateForm from "./CreateForm";
import Link from "next/link";
import { PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

interface SidebarProps {
  scroll: () => void;
}

export default function Sidebar({ scroll }: SidebarProps) {
  const [fullSidebar, setFullSidebar] = useState<boolean>(false);

  const handleSidebar = () => {
    setFullSidebar(true);
  };

  return (
    <div className={`fixed ${fullSidebar ? "left-0 z-50 navOpen" : "navClosed"} h-screen`}>
      <aside
        className={`fixed bg-gray-200 item-shadow -left-80 md:left-0 px-8 h-screen w-80 lg:w-96 md:z-50`}
      >
        <Image
          className="mb-16 w-auto h-auto"
          alt="Metrolina Greenhouses logo"
          src="MetrolinaGreenhouses_logo.svg"
          width={300}
          height={300}
        />
        <CreateForm setFullSidebar={setFullSidebar} scroll={scroll} />
      </aside>
      <aside
        className={`fixed bg-gray-200 item-shadow h-screen w-16 pt-5 flex flex-col items-center gap-1`}
      >
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
            className="w-auto h-auto"
          />
        </Link>
        <PlusCircleIcon
          onClick={handleSidebar}
          width={50}
          className="text-green-600 hover:cursor-pointer transition duration-100 hover:scale-110"
          data-tooltip-id="addItem"
          data-tooltip-content="Add an item"
        />
        {fullSidebar ? (
          <ChevronLeftIcon
            onClick={() => setFullSidebar(false)}
            className="text-gray-600"
            width={80}
          />
        ) : <ChevronRightIcon
        onClick={() => setFullSidebar(true)}
        className="text-gray-600"
        width={80}
      />}
      </aside>
      <Tooltip id="addItem" variant="success" place="right" />
    </div>
  );
}
