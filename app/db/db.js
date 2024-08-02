import mysql from "mysql2/promise";

export const dbUsers = async ({ query, values = [] }) => {
  const dbConnection = await mysql.createConnection({
    host: process.env.USERS_HOST,
    database: process.env.USERS_DB,
    user: process.env.USERS_DBUSER,
    // password: process.env.PASSWORD,
    password: process.env.USERS_DBPASS,
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

const db = async ({ query, values = [] }) => {
  const dbConnection = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    // password: process.env.PASSWORD,
    password: "",
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
