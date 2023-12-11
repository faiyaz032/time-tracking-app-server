//dependencies
const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
  console.log(`Server is alive on PORT:${PORT}`);
  //check database connection
  pool.getConnection(err => {
    if (!err) return console.log(`Database connected successfully`);
    console.log(err);
  });
});
