// AI prompt & classification logic
const axios = require('axios');
require('dotenv').config();

module.exports = async function classify(offer) {
  const prompt = `Classify the following job offer:
Title: ${offer.title}
Description: ${offer.description}

Return a JSON object with:
- frontend: true/false (is this a frontend job?)
- seniority: junior/mid/senior/unknown
- tech: array of technologies (e.g. ["React", "Vue"])
- spam: true/false (is this spam or junk?)`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant for job offer classification.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 200,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const text = response.data.choices[0].message.content;
    let aiResult = {};
    try {
      aiResult = JSON.parse(text);
    } catch (e) {
      // fallback: try to extract JSON from text
      const match = text.match(/\{[\s\S]*\}/);
      if (match) aiResult = JSON.parse(match[0]);
    }
    return {
      ...offer,
      frontend: aiResult.frontend,
      seniority: aiResult.seniority,
      tech: aiResult.tech,
      spam: aiResult.spam,
    };
  } catch (err) {
    console.error('AI classification error:', err);
    return {
      ...offer,
      frontend: null,
      seniority: 'unknown',
      tech: [],
      spam: false,
    };
  }
};
