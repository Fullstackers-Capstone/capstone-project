// const conn = require('./conn');
// const { JSON, UUID, UUIDV4, TEXT, STRING} = conn.Sequelize;
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { Configuration, OpenAIApi } = require('openai');
// const JWT = process.env.JWT;
// const User = require('./User');


// const configuration = new Configuration({
//     apiKey: process.env.OPEN_AI_KEY,
// });



// const Prompt = conn.define('prompt', {
//   id: {
//     type: UUID,
//     primaryKey: true,
//     defaultValue: UUIDV4
//   },
//   userPrompt: {
//     type: TEXT,
//   },
//   name: {
//     type: STRING,
//   },
//   response: {
//     type: JSON
//   },

// });

// Prompt.findAllBySpotifyId = async function(id){
//   try {
//     const user = await User.findbySpotifyId(id);
//     if(user){
//       return this.findAll({
//         where:{
//             userId: user.id
//         }
//       });
//     }
      
//     throw 'prompt not found';
//   }
//   catch(ex){
//     const error = new Error('This user has no prompts');
//     error.status = 401;
//     throw error;
//   }
// }



// Prompt.prototype.askChatGPT = async function(){
//   try{
//     const openai = new OpenAIApi(configuration);
//     const prompt = this.userPrompt;
//     const response = await openai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: "user", content: `${prompt}`}],

//         max_tokens: 500,
//         temperature: 0.8,
//         top_p: 1.0,
//         frequency_penalty: 0.0,
//         presence_penalty: 0.0,
        
//     })
//     this.response = await response.data.choices[0].message.content;
//     return this;
//   }
//   catch(ex){
//     const error = new Error('An error occurred');
//     error.status = 401;
//     throw error;
//   }
// }

// module.exports = Prompt;



const conn = require('./conn');
const { JSON, UUID, UUIDV4, TEXT, STRING, ARRAY, BOOLEAN} = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Configuration, OpenAIApi } = require('openai');
const JWT = process.env.JWT;
const User = require('./User');


const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const Prompt = conn.define('prompt', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  userPrompt: {
    type: TEXT,
  },
  name: {
    type: STRING,
  },
  response: {
    type: JSON
  },
  uriList: {
    type: ARRAY(STRING)  // changed this line
  },
  isCreated: {
    type: BOOLEAN,
    defaultValue: false
  },
  userInput: {
    type: TEXT
  }
});

Prompt.findAllBySpotifyId = async function(id){
  try {
    const user = await User.findbySpotifyId(id);
    if(user){
      return this.findAll({
        where:{
            userId: user.id
        }
      });
    }
      
    throw 'prompt not found';
  }
  catch(ex){
    const error = new Error('This user has no prompts');
    error.status = 401;
    throw error;
  }
}

Prompt.prototype.askChatGPT = async function(){
  try{
    const openai = new OpenAIApi(configuration);
    const prompt = this.userPrompt;
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: "user", content: `${prompt}`}],

        max_tokens: 1000,
        temperature: 0.8,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        
    })
    this.response = await response.data.choices[0].message.content;
    return this;
  }
  catch(ex){
    const error = new Error('An error occurred');
    error.status = 401;
    throw error;
  }

}

module.exports = Prompt;


