import Item, { ItemType } from "./Item"

interface ItemContainerProps {
    items: ItemType[]
}

export default function ItemContainer({ items }: ItemContainerProps) {
  return (
    <section className="">
        {items.map((item) => {
            return <Item key={item.itemNumber} item={item}/>
        })}
    </section>
  )
}
