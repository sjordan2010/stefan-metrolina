export const getItems = async () => {
  const res = await fetch("https://m3.metrolinagreenhouses.com/api/Test/GetItemList", {
      method: 'GET',
    //   mode: 'no-cors',
    headers: { 
        apiKey: "736f64a0fe6b4e0eacf7a0b4144d39bb",
     },
  });
//   console.log(res)
  console.log('res.text()', await res.text())
  const data = await res.json();
//   console.log('data in getItems function', data)
  return data;
};

export const getItems2 = () => {
    return new Promise((resolve, reject) => {
      fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://m3.metrolinagreenhouses.com/api/Test/GetItemList',
          headers: {
            'apiKey': '736f64a0fe6b4e0eacf7a0b4144d39bb',
          },
        }),
      })
        .then(response => response.json())
        .then(data => {
        //   console.log('getItems data', data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  
// export const getItems2 = async () => {
//     const res = await fetch('/api/proxy', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           url: 'https://m3.metrolinagreenhouses.com/api/Test/GetItemList',
//           headers: {
//             'apiKey': '736f64a0fe6b4e0eacf7a0b4144d39bb',
//           },
//         }),
//       })
//       const data = await res.json()
//       console.log('getItems data', data)
//       return data
        
//     }