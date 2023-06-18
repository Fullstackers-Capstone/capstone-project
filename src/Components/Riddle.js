/*

import React, { useEffect, useState } from 'react';
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY
});

const openai = new OpenAIApi(configuration);

function MyComponent() {
  const [generatedRiddle, setGeneratedRiddle] = useState('');

  useEffect(() => {
    generateMusicRiddle()
      .then((riddle) => {
        setGeneratedRiddle(riddle);
      })
      .catch((error) => {
        console.error('Error generating riddle:', error);
      });
  }, []);

  async function generateMusicRiddle() {
    const prompt = "Generate a music-related riddle.";

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: prompt },
      ],
      max_tokens: 100,
      temperature: 0.8,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const generatedRiddle = response.choices[0].message.content.trim();
    return generatedRiddle;
  }

  return (
    <div>
      <h2>Music Riddle</h2>
      <p>{generatedRiddle}</p>
    </div>
  );
}

export default MyComponent;


*/