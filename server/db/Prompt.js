const conn = require('./conn');
const { JSON, UUID, UUIDV4, TEXT, STRING} = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const Prompt = conn.define('prompt', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  userInput: {
    type: TEXT,
    unique:true
  },
  name: {
    type: STRING,
    unique: true
  },
  response: {
    type: JSON
  }
});

Prompt.findAllByToken = async function(token){
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
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

module.exports = Prompt;

