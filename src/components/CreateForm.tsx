import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateToast from "./CreateToast";

interface CreateFormProps {
  setFullSidebar: any;
  scroll: () => void;
}

export default function CreateForm({ setFullSidebar, scroll }: CreateFormProps) {
  const [showToast, setShowToast] = useState<boolean>(false);

  const CreateSchema = Yup.object().shape({
    itemNumber: Yup.string()
      .matches(/^[0-9]+$/, "Item # must only contain digits 0-9")
      .min(5, "Item # must be a 5 digit number")
      .max(5, "Item # must be a 5 digit number")
      .required("Required"),
    itemDesc: Yup.string()
      .min(3, "Item description must be at least 3 characters long")
      .max(50, "Item description can only contain 50 characters")
      .required("Required"),
    //   UPC: Yup.string().matches(/^[0-9]+$/, "UPC can only contain numbers"),
    //   SKU: Yup.string().matches(/^[0-9]+$/, "Must be only numbers"),
  });

  const createItemMutation = useMutation((formData: CreateItem) =>
    fetch("/api/createProxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://m3.metrolinagreenhouses.com/api/Test/CreateItem?${formData.params}`,
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }),
    })
      .then((res) => res.json())

      .catch((error) => console.log("Create Mutation Error: ", error))
  );

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateSchema),
  });

  const onSubmit = (data: any) => {
    const params = new URLSearchParams();
    params.append("itemNumber", data.itemNumber);
    params.append("itemDesc", data.itemDesc);

    data.params = params.toString().replace(/\+/g, "%20");

    createItemMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getItems"]);
      },
    });
    setShowToast(true);
    reset();
    setFullSidebar(false);
    scroll();
  };

  type CreateItem = {
    itemNumber: string;
    itemDesc: string;
    params?: string;
  };

  return (
    <>
      <div className="w-full flex border-2 rounded-sm item-shadow p-6 bg-white">
        <form className="flex flex-col gap-4 text-sm w-full" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-4">
            <legend className="flex items-center text-lg font-semibold mb-2">
              <PlusCircleIcon className="text-green-500" width={20} /> Add an Item
            </legend>
            <div className="flex flex-col w-full items-end justify-center">
              <label htmlFor="itemNumber">
                Item #:
                <input
                  className="px-2 py-1 border ml-2 rounded-sm w-32 lg:w-44"
                  type="text"
                  placeholder="00000"
                  {...register("itemNumber", {})}
                />
              </label>
              {errors.itemNumber ? (
                //@ts-ignore
                <span className="text-red-600">{errors.itemNumber.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col w-full items-end justify-start">
              <label htmlFor="itemDesc" className="flex">
                Description:
                <textarea
                  className="px-2 py-1 border ml-2 rounded-sm h-24 w-full"
                  placeholder="Item description..."
                  {...register("itemDesc", {})}
                />
              </label>
              {errors.itemDesc ? (
                //@ts-ignore
                <span className="text-right text-red-600">{errors.itemDesc.message}</span>
              ) : null}
            </div>

            <button
              className="m-auto w-3/4 flex items-center justify-center bg-green-500 px-5 py-2 text-white rounded-md item-shadow hover:brightness-90"
              type="submit"
            >
              Create Item
            </button>
          </fieldset>
        </form>
      </div>

      {showToast && <CreateToast setShowToast={setShowToast} />}
    </>
  );
}
