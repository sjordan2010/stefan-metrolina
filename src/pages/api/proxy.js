// import fetch from 'isomorphic-unfetch';

export default async function handler(req, res) {
  const { url, ...options } = req.body;
  console.log("req.body", req.body);
  console.log("options", options);

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log('proxy data:', data)

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error proxying the request" });
  }
}
