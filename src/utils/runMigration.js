//dependencies
const pool = require('../config/database');

/**
 * This function runs the queries to create the necessary tables
 */
async function runMigration() {
  try {
    const db = await pool.getConnection();

    // query to create 'users' table
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;

    // query to create 'entries' table
    const createEntriesTableQuery = `
     CREATE TABLE IF NOT EXISTS entries (
       id INT AUTO_INCREMENT PRIMARY KEY,
       userId INT,
       startTime DATETIME NOT NULL,
       endTime DATETIME,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (userId) REFERENCES users(id)
     );
   `;

    // run the queries
    await db.query(createUsersTableQuery);
    await db.query(createEntriesTableQuery);

    return console.log(`Initial tables created successfully`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = runMigration;
