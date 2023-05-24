export const getItems = async () => {
  const res = await fetch("https://m3.metrolinagreenhouses.com/api/Test/GetItemList", {
    method: "GET",
    headers: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  const data = await res.json();

  return data;
};

export const getItems2 = () => {
  return new Promise((resolve, reject) => {
    fetch("/api/proxy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: "https://m3.metrolinagreenhouses.com/api/Test/GetItemList",
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
