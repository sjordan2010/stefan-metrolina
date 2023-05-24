// export default async function handler(req, res) {
//   const { url, ...options } = req.body;
//   console.log("req.body", req.body);
//   console.log("options", options);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         apiKey: process.env.API_KEY,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(options.body),
//     });
//     const data = await response.json();

//     res.status(response.status).json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Error proxying the request" });
//   }
// }
export default async function handler(req, res) {
  const { url, ...options } = req.body;
  // console.log("req.body", req.body);
  console.log("options", options);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        apiKey: process.env.API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.body),
    });
    const data = await response.text();
    console.log('edit response: ', data)
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error proxying the request" });
  }
}