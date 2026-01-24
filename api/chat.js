import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    const { message } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
      instructions: `
You are a strict internal knowledge assistant.
Answer ONLY from the uploaded files.
If the answer is missing, say exactly:
"Not found in knowledge base."
`
    });

    return res.status(200).json({
      reply: response.output_text
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      error: err.message || "Internal Server Error"
    });
  }
}
