import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:1234",
];

//Create a middleware
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  });
};
