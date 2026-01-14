import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// console.log(process.argv); //Nos da los argumentos a la línea de comandos

const args = process.argv.slice(2);
// console.log("Arguments", args);

//1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? ".";

//2. Formateo simple de los tamaños
const formatBytes = (size) => {
  if (size < 1024) return `${size} bytes`;
  return `${(size / 1024).toFixed(2)} KB`;
};

//3. Leer los nombres, sin info
const files = await readdir(dir);
// console.log(files);

//4. Recuperar la info de cada file
const entries = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name);
    const info = await stat(fullPath);

    return {
      name,
      size: formatBytes(info.size),
      isDir: info.isDirectory(),
    };
  }),
);

//sort
// 1. Que aparezcan primero las carpetas
entries.sort((a, b) => {
  if (a.isDir && !b.isDir) return -1;
  if (!a.isDir && b.isDir) return 1;
  return a.name.localeCompare(b.name);
});

// 2. Que esten en orden alfabético los ficheros
entries.sort((a, b) => a.name.localeCompare(b.name));

// filter
// tener en cuenta flags como --files-only o --dirs-only
const filter = (entry) => {
  if (args.includes("--files-only")) return !entry.isDir;
  if (args.includes("--dirs-only")) return entry.isDir;
  return true;
};

entries = entries.filter(filter);

for (const entry of entries) {
  //Renderizar la información
  const icon = entry.isDir ? "📁" : "📄";
  const size = entry.isDir ? "-" : `${entry.size}`;
  console.log(`${icon} ${entry.name.padEnd(25)} ${size}`);
}
