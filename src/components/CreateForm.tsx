import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

interface CreateFormProps {
  setFullSidebar: any;
  scroll: () => void;
 }

export default function CreateForm({ setFullSidebar, scroll }: CreateFormProps) {
  const CreateSchema = Yup.object().shape({
    itemNumber: Yup.string()
      .matches(/^[0-9]+$/, "Item # must only contain digits 0-9")
      .min(5, "Item # must be a 5 digit number")
      .max(5, "Item # must be a 5 digit number")
      .required("Required"),
    description: Yup.string()
      .min(3, "Item description must be at least 3 characters long")
      .max(50, "Item description can only contain 50 characters")
      .required("Required"),
    //   UPC: Yup.string().matches(/^[0-9]+$/, "UPC can only contain numbers"),
    //   SKU: Yup.string().matches(/^[0-9]+$/, "Must be only numbers"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreateSchema),
  });

  const onSubmit = (data: any) => {
    console.log("values", data);
    reset();
    setFullSidebar(false)
    scroll()
  };

  type CreateItem = {
    itemNumber: string;
    description: string;
  };

//   console.log("Form Errors on line 41 - CreateForm.tsx: ", errors);

  return (
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
            {/* <span className=" text-red-600">text for error here</span> */}
            {errors.itemNumber ? (
              <span className="text-red-600">{errors.itemNumber.message}</span>
            ) : null}
          </div>
         
          <div className="flex flex-col w-full items-end justify-start">
            <label htmlFor="description" className="flex">
              Description:
              <textarea
                className="px-2 py-1 border ml-2 rounded-sm h-24 w-full"
                placeholder="Item description..."
                {...register("description", {})}
              />
            </label>
            {errors.description ? (
              <span className="text-right text-red-600">{errors.description.message}</span>
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
  );
}
