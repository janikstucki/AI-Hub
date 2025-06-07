import mysql from 'mysql2/promise';
import { db } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  console.log('Database created or already exists! ✅');

  await connection.end();
}

export async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS UserData (
        UserDataId int PRIMARY KEY AUTO_INCREMENT,
        Username varchar(50) UNIQUE,
        Email varchar(254) UNIQUE,
        PasswordHash varchar(255)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS AccessTokens (
        AccessTokenId int PRIMARY KEY AUTO_INCREMENT,
        TokenValue char(37),
        fk_UserDataId int,
        FOREIGN KEY (fk_UserDataId) REFERENCES UserData(UserDataId) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS Chats (
        ChatId int PRIMARY KEY AUTO_INCREMENT,
        ChatName varchar(25),
        SelectedAI varchar(50),
        fk_UserDataId int,
        FOREIGN KEY (fk_UserDataId) REFERENCES UserData(UserDataId) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ChatMessages (
        ChatMessageId int PRIMARY KEY AUTO_INCREMENT,
        Content TEXT,
        Sender ENUM('user', 'assistant'),
        fk_ChatId int,
        FOREIGN KEY (fk_ChatId) REFERENCES Chats(ChatId) ON DELETE CASCADE
      );
    `);

    console.log("Tables are created or already exist! ✅");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

export async function setup() {
  await createDatabaseIfNotExists();
  await createTables();
}
