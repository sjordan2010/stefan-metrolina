interface ItemProps {
  item: ItemType
}

export type ItemType = {
//   itemKey: number;
  itemDesc: string;
  itemNumber: string;
  sku: string;
  upc: string;
  locations: { locationId: string; onHandQty: number; }[];
};

export default function Item({ item }: ItemProps) {
  return <div className="w-11/12">Item</div>;
}
