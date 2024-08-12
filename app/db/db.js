import mysql from "mysql2/promise";

export const dbConnectionUsers = async () => {
  const conn = await mysql.createConnection({
    host: process.env.USERS_HOST,
    database: process.env.USERS_DB,
    user: process.env.USERS_DBUSER,
    // password: process.env.PASSWORD,
    password: process.env.USERS_DBPASS,
  });
  return conn;
};

export const dbConnection = async () => {
  const conn = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    // password: "",
  });
  return conn;
};

const db = async ({ query, values = [], connection }) => {
  try {
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    throw Error(error.message);
    // return { error };
  }
};
export default db;
