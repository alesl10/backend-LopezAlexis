import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV;

let persistence;

if (environment.trim() === "local") {
  persistence = "memory";
} else {
  persistence = "mongo";
}

export default persistence;