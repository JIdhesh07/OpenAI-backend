const express = require("express");


const cors = require('cors');

require("dotenv").config();
const OpenAI = require("openai");



const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey : process.env.APIKEY,
});

app.post('/complete', async(req,res)=>{  

    const userPrompt = req.body.userPrompt;
    const predefinedPrompt = " Complete the text :  ";
    const prompt = predefinedPrompt + userPrompt;
    console.log(prompt);
    const response= await openai.chat.completions.create({
      model : 'gpt-3.5-turbo',
      messages : [{"role":"user", "content" : prompt}],
      max_tokens:25,
    });
    const completedText= userPrompt + response.choices[0].message.content;
    console.log(completedText);
    res.json({ completedText });
})

app.post('/summarize', async(req,res)=>{

  const userPrompt = req.body.userPrompt;
  const predefinedPrompt = " Summarize :  ";
  const prompt = predefinedPrompt + userPrompt;
  console.log(prompt);
  const response= await openai.chat.completions.create({
    model : 'gpt-3.5-turbo',
    messages : [{"role":"user", "content" : prompt}],
    max_tokens:20,
  });
  const completedText= response.choices[0].message.content;
  console.log(completedText);
  res.json({ completedText });
})

app.post('/answer', async(req,res)=>{

  const userPrompt = req.body.userPrompt;


  const predefinedPrompt = " Answer  :  ";
  const prompt = predefinedPrompt + userPrompt;

  console.log(prompt);
  const response= await openai.chat.completions.create({
    model : 'gpt-3.5-turbo',
    messages : [{"role":"user", "content" : prompt}],
    max_tokens:20,
  });
  const completedText= response.choices[0].message.content;
  console.log(completedText);
  res.json({ completedText });
})



const port= process.env.PORT || 8000;

app.listen(port, () => console.log(`Server starting ${port}`));
