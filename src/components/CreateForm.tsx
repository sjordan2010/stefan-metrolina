import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function CreateForm() {
  const CreateSchema = Yup.object().shape({
    itemNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only numbers")
      .min(5, "Item number must be five characters")
      .max(5, "Item number must be five characters")
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

  const onSubmit = (data) => {
    console.log("values", { data });
    reset();
  };

  type CreateItem = {
    itemNumber: string;
    description: string;
  };

  console.log("Form Errors on line 41 - CreateForm.tsx: ", errors);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="itemNumber">
        Item #:
        <input type="text" placeholder="00000" {...register("itemNumber", {})} />
      </label>
      {errors.itemNumber ? <div className="text-red-600">{errors.itemNumber.message}</div> : null}

      <label htmlFor="description">
        Description:
        <input type="text" placeholder="description" {...register("description", {})} />
      </label>
      {errors.description ? <div className="text-red-600">{errors.description.message}</div> : null}

      <button type="submit">Create Item</button>
    </form>
  );
}
