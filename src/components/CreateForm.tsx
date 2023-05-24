import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    itemDesc: Yup.string()
      .min(3, "Item description must be at least 3 characters long")
      .max(50, "Item description can only contain 50 characters")
      .required("Required"),
    //   UPC: Yup.string().matches(/^[0-9]+$/, "UPC can only contain numbers"),
    //   SKU: Yup.string().matches(/^[0-9]+$/, "Must be only numbers"),
  });

  const createItemMutation = useMutation((formData: CreateItem) => 
  // {
    // const params = new URLSearchParams();
    // params.append('itemNumber', formData.itemNumber);
    // params.append('itemDesc', formData.itemDesc);
    fetch('/api/createProxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://m3.metrolinagreenhouses.com/api/Test/CreateItem?' + formData.params,
        headers: {
          'apiKey': '736f64a0fe6b4e0eacf7a0b4144d39bb',
        },
      }),
    })
      .then((res) => res.json())
  
      .catch(error => console.log('Create Mutation Error: ', error))
  // }
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
    params.append('itemNumber', data.itemNumber);
    params.append('itemDesc', data.itemDesc);
    console.log('params', params.toString())
    data.params = params.toString().replace(/\+/g, '%20')
    console.log("values", data);
    createItemMutation.mutate(data, {
      onSuccess: () => {
        // Trigger a refetch of the item data after the mutation is successful
        queryClient.invalidateQueries(['getItems']);
      },
    }); // Call the mutation with the form data
    
    reset();
    setFullSidebar(false)
    scroll()
  };

 



  // const onSubmit = (data: any) => {
  //   const params = new URLSearchParams();
  //   params.append('itemNumber', encodeURIComponent(data.itemNumber));
  //   params.append('itemDesc', encodeURIComponent(data.itemDesc));
  //   console.log('params', params.toString());
  //   data.params = params.toString();
  //   console.log("values", data);
  //   createItemMutation.mutate(data); // Call the mutation with the form data
  //   reset();
  //   setFullSidebar(false);
  //   scroll();
  // };
  
  type CreateItem = {
    itemNumber: string;
    itemDesc: string;
    params?: string;
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
            <label htmlFor="itemDesc" className="flex">
              Description:
              <textarea
                className="px-2 py-1 border ml-2 rounded-sm h-24 w-full"
                placeholder="Item description..."
                {...register("itemDesc", {})}
              />
            </label>
            {errors.itemDesc ? (
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
  );
}
