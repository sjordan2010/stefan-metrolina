import Image from "next/image";
import CreateForm from "./CreateForm";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import { type Dispatch, type SetStateAction, useState } from "react";
import CreateModal from "./CreateModal";

interface SidebarProps {
  scroll: () => void;
  setShowCreateToast: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ scroll, setShowCreateToast }: SidebarProps) {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  return (
    <div className="fixed h-screen">
      <aside className="fixed bg-gray-200 item-shadow -left-80 md:left-0 px-8 h-screen w-80 lg:w-96 md:z-50">
        <Link
          className="transition duration-100 hover:scale-110"
          href="https://www.metrolinagreenhouses.com"
          target="_blank"
        >
          <Image
            className="mb-16 w-auto h-auto"
            alt="Metrolina Greenhouses logo"
            src="MetrolinaGreenhouses_logo.svg"
            width={300}
            height={300}
          />
        </Link>
        <CreateForm scroll={scroll} setShowCreateToast={setShowCreateToast} />
      </aside>
      <aside className="fixed bg-gray-200 item-shadow h-screen w-16 pt-5 flex flex-col items-center gap-5">
        <Link
          className="transition duration-100 hover:scale-110"
          href="https://www.metrolinagreenhouses.com"
          target="_blank"
        >
          <Image
            alt="Metrolina Greenhouses"
            src="/MG_small_logo.png"
            width={40}
            height={50}
            className="w-auto h-auto"
          />
        </Link>
        <PlusCircleIcon
          onClick={() => setShowCreateModal(true)}
          width={50}
          className="text-green-600 hover:cursor-pointer transition duration-100 hover:scale-110"
          data-tooltip-id="addItem"
          data-tooltip-content="Add an item"
        />
        {showCreateModal && (
          <CreateModal
            scroll={scroll}
            setShowCreateModal={setShowCreateModal}
            setShowCreateToast={setShowCreateToast}
          />
        )}
      </aside>
      <Tooltip id="addItem" variant="success" place="right" />
    </div>
  );
}
