import mysql from "mysql2/promise";

const db = async ({ query, values = [] }) => {
  const dbConnection = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });

  try {
    const [results] = await dbConnection.execute(query, values);
    dbConnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    // return { error };
  }
};
export default db;
