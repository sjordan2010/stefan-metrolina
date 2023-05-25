import type { Dispatch, SetStateAction } from "react";
import { ItemType } from "./Item";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteModalProps {
  item: ItemType;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setDeleteToast: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({
  item,
  setShowDeleteModal,
  setDeleteToast,
}: DeleteModalProps) {
  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation(
    (itemKey: number) =>
      fetch("/api/deleteProxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `https://m3.metrolinagreenhouses.com/api/Test/DeleteItem?itemKey=${itemKey}`,
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
          },
        }),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getItems"]);
      },
    }
  );

  const handleDelete = (item: ItemType) => {
    const { itemKey } = item;
    deleteItemMutation.mutate(itemKey);
    setDeleteToast(true);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full glass"
      >
        <div className="relative w-full max-w-md max-h-full m-auto top-24">
          <div className="relative rounded-lg shadow bg-gray-700">
            <button
              onClick={() => setShowDeleteModal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-300">
                Are you sure you want to delete Item #: {item.itemNumber}?
              </h3>
              <p className="italic text-white mb-4">{item.itemDesc}</p>
              <button
                onClick={(e) => handleDelete(item)}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I am sure
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
