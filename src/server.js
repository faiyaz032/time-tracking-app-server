//dependencies
const app = require('./app');
const pool = require('./config/database');
const runMigration = require('./utils/runMigration');

const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, async () => {
  console.log(`Server is alive on PORT:${PORT}`);
  //check database connection
  try {
    await pool.getConnection();
    await runMigration();
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(error);
  }
});
