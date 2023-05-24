import { ItemType } from "./Item";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditModalProps {
  item: ItemType;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  setEditToast: Dispatch<SetStateAction<boolean>>;
  scroll: () => void;
}

export default function EditModal({ item, setShowEdit, setEditToast, scroll }: EditModalProps) {
 const EditSchema = Yup.object().shape({
    itemNumber: Yup.string()
      .matches(/^[0-9]+$/, "Item # must only contain digits 0-9")
      .min(5, "Item # must be a 5 digit number")
      .max(5, "Item # must be a 5 digit number")
      .required("Required"),
    itemDesc: Yup.string()
      .min(3, "Item description must be at least 3 characters long")
      .max(50, "Item description can only contain 50 characters")
      .required("Required"),
    upc: Yup.string().matches(/^[0-9]+$/, "UPC can only contain numbers"),
    sku: Yup.string().matches(/^[0-9]+$/, "SKU can only contain numbers"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      itemDesc: item.itemDesc,
      itemNumber: item.itemNumber,
      sku: item.sku,
      upc: item.upc,
    },
    resolver: yupResolver(EditSchema),
  });

  const queryClient = useQueryClient();

  const editItemMutation = useMutation(
    (data: ItemType) =>
      fetch("/api/editProxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `https://m3.metrolinagreenhouses.com/api/Test/EditItem`,
          headers: {
            apiKey: "736f64a0fe6b4e0eacf7a0b4144d39bb",
          },
          body: data,
        }),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getItems"]);
      },
    }
  );

  const onSubmit = (data: any) => {
    console.log("values", data);

    data.itemKey = item.itemKey;
    // handleEdit HERE
    editItemMutation.mutate(data);
    reset();
    setShowEdit(false);
    setEditToast(true);
    scroll()
  };

  return (
    <section
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full glass"
    >
      <div className="relative w-full max-w-md max-h-full m-auto top-20">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => setShowEdit(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Edit Item #: {item.itemNumber}
              {item.itemKey}
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="itemNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item #:
                </label>
                <input
                  type="text"
                  id="itemNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  placeholder={item.itemNumber}
                  required
                  {...register("itemNumber", {})}
                />
                {errors.itemNumber ? (
                  <span className="text-right text-red-600">{errors.itemNumber.message}</span>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="itemDesc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Description:
                </label>
                <input
                  {...register("itemDesc", {})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  required
                />
                {errors.itemDesc ? (
                  <span className="text-right text-red-600">{errors.itemDesc.message}</span>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="sku"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  SKU:
                </label>
                <input
                  {...register("sku", {})}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  required
                />
                {errors.sku ? (
                  <span className="pt-10 text-red-500">{errors.sku.message}</span>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="upc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  UPC:
                </label>
                <input
                  disabled
                  {...register("upc", {})}
                  className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex justify-between gap-3">
                <button
                  onClick={() => setShowEdit(false)}
                  type="button"
                  className="w-full text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full text-white bg-green-700 hover:brightness-90 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Edit Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
