import { useState } from "react";
import Item, { ItemType } from "./Item";
import DeleteToast from "./DeleteToast";
import EditToast from "./EditToast";

interface ItemContainerProps {
  items: ItemType[];
  scroll: () => void;
}

export default function ItemContainer({ items, scroll }: ItemContainerProps) {
  const [deleteToast, setDeleteToast] = useState<boolean>(false);
  const [editToast, setEditToast] = useState<boolean>(false);

  return (
    <section className="flex flex-col items-center w-11/12 p-3 md:p-10 gap-6 ml-16 md:ml-80 lg:ml-96 my-5 overflow-scroll">
      {items.map((item) => {
        return (
          <Item
            key={item.itemKey}
            item={item}
            setDeleteToast={setDeleteToast}
            setEditToast={setEditToast}
            scroll={scroll}
          />
        );
      })}
      {deleteToast && <DeleteToast setDeleteToast={setDeleteToast} />}
      {editToast && <EditToast setEditToast={setEditToast} />}
    </section>
  );
}
