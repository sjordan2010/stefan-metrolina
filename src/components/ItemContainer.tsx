import Item, { ItemType } from "./Item"

interface ItemContainerProps {
    items: ItemType[]
}

export default function ItemContainer({ items }: ItemContainerProps) {
  return (
    <section className="flex flex-col items-center w-11/12 p-3 md:p-10 gap-4 ml-12 md:ml-96 mt-20">
        {items.map((item) => {
            return <Item key={item.itemNumber} item={item}/>
        })}
    </section>
  )
}
