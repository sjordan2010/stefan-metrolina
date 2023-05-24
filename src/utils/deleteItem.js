export const deleteItem = async () => {
  const res = await fetch("https://m3.metrolinagreenhouses.com/api/Test/GetItemList", {
    method: "POST",
    headers: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    },
  });
  const data = await res.json();
  return data;
};
