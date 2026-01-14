import { createServer } from "node:http"; //Crear servidor http
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";

// Para leer las variables de entorno
process.loadEnvFile();
// const port = 3000 //Indicar el puerto
const port = process.env.PORT || 3000; //Variable de entorno PORT

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json", "charset=utf-8");
  res.end(JSON.stringify(data));
}

const users = [
  { id: 1, name: "Bruce" },
  { id: 2, name: "Clark" },
];

const server = createServer(async (req, res) => {
  //charset=utf-8, para que los emojis se vean
  const { method, url } = req;

  const [pathname, querystring] = url.split("?");
  //{ pathname: '/health', querystring: 'limit=2' }
  const searchParams = new URLSearchParams(querystring);
  console.log(searchParams.get("limit")); //2   -   type string

  console.log({ pathname, querystring });
  if (method === "GET") {
    if (url === "/") {
      res.setHeader("Content-Type", "text/plain;charset=utf-8");
      return res.end("Hola desde Node 😊!!");
    }

    if (pathname === "/users") {
      if (
        Number.isNaN(Number(searchParams.get("limit") || "0")) ||
        Number.isNaN(Number(searchParams.get("offset") || "0"))
      ) {
        return sendJson(res, 400, {
          error: "Limit and offset cannot be used together",
        });
      }
      const limit = Number(searchParams.get("limit")) || users.length;
      const offset = Number(searchParams.get("offset")) || 0;

      const paginatedUsers = users.slice(offset, offset + limit);

      return sendJson(res, 200, paginatedUsers);
    }

    if (pathname === "/health") {
      return sendJson(res, 200, { status: "OK", uptime: process.uptime() });
    }
  }

  if (method === "POST") {
    if (pathname === "/users") {
      const body = await json(req); //Para traer el cuerpo de la solicitud (body)

      if (!body || !body.name) {
        return sendJson(res, 400, { error: "Name is required" });
      }

      const newUser = {
        name: body.name,
        id: randomUUID(),
      };

      users.push(newUser);

      res.end("Crear nuevo usuario");
    }
  }

  return sendJson(res, 404, { error: "Not Found" });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
