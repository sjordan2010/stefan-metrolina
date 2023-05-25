export const getItems = () => {
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
