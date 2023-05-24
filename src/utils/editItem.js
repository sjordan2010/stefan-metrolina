export const editItem = async () => {
    const res = await fetch("https://m3.metrolinagreenhouses.com/api/Test/GetItemList", {
        method: 'POST',
        headers: { 
            apiKey: "736f64a0fe6b4e0eacf7a0b4144d39bb",
            // mode: 'no-cors',
         },
      });
      const data = await res.json();
      return data;
    }