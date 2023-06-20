try {
  require('../env.js');
}
catch(ex){
  console.log('running locally? add an env.js file with client_id and client_secret');
  console.log('deploying? add a client_id and client_secret environment variable');
  console.log(ex);
}
const app = require('./app');

const init = async()=> {
  try {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};


init();