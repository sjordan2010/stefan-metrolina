import { Dispatch, SetStateAction } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateModalProps {
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
  setShowCreateToast: Dispatch<SetStateAction<boolean>>;
  scroll: () => void;
}

export default function CreateModal({
  setShowCreateModal,
  setShowCreateToast,
  scroll,
}: CreateModalProps) {
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

  const createModalMutation = useMutation((formData: FieldValues) =>
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
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(CreateSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const params = new URLSearchParams();
    params.append("itemNumber", data.itemNumber);
    params.append("itemDesc", data.itemDesc);

    data.params = params.toString().replace(/\+/g, "%20");

    try {
      await createModalMutation.mutateAsync(data);
      setShowCreateModal(false);
      setShowCreateToast(true);
      queryClient.invalidateQueries(["getItems"]);
      scroll();
    } catch (error) {
      console.log("Create Mutation Error: ", error);
    }
  };

  return (
    <section
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full glass"
    >
      <div className="relative w-full max-w-md max-h-full m-auto top-20">
        <div className="relative bg-gray-700 rounded-lg shadow">
          <button
            onClick={() => setShowCreateModal(false)}
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
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-white">Create a New Item</h3>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="itemNumber" className="block mb-2 text-sm font-medium text-white">
                  Item #:
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  type="text"
                  placeholder="00000"
                  required
                  {...register("itemNumber", {})}
                />
                {errors.itemNumber ? (
                  //@ts-ignore
                  <span className="text-right text-red-600">{errors.itemNumber.message}</span>
                ) : null}
              </div>
              <div>
                <label htmlFor="itemDesc" className="block mb-2 text-sm font-medium text-white">
                  Item Description:
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
                  placeholder="Item description..."
                  {...register("itemDesc", {})}
                  required
                />
                {errors.itemDesc ? (
                  //@ts-ignore
                  <span className="text-right text-red-600">{errors.itemDesc.message}</span>
                ) : null}
              </div>

              <div className="flex justify-between gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  type="button"
                  className="w-full text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Cancel
                </button>
                <button
                  disabled={!isValid || !isDirty}
                  type="submit"
                  className="w-full text-white bg-green-700 hover:brightness-90 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 disabled:hover:bg-gray-400"
                >
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
