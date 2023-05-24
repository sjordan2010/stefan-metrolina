import Item, { ItemType } from "./Item"

interface ItemContainerProps {
    items: ItemType[]
}

export default function ItemContainer({ items }: ItemContainerProps) {
  return (
    <section className="flex flex-col items-center w-11/12 p-3 md:p-10 gap-6 ml-16 md:ml-96 my-5">
        {items.map((item) => {
            return <Item key={item.itemNumber} item={item}/>
        })}
    </section>
  )
}
