import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message } = req.body;

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: message,
      instructions: `
You are a strict internal knowledge assistant.
Answer ONLY from the uploaded files.
If the answer is missing, say exactly:
"Not found in knowledge base."
`
    });

    res.status(200).json({
      reply: response.output_text
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

