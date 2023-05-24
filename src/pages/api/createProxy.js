export default async function handler(req, res) {
  const { url, ...options } = req.body;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error proxying the request" });
  }
}
