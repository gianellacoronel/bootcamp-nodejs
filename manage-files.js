import { writeFile, readFile, mkdir } from "node:fs/promises";
import { join, basename, extname } from "node:path";

//Leer archivo
let content = "";
if (process.permission.has("fs.read", "archivo.txt")) {
  content = await readFile("archivo.txt", "utf-8");
  console.log(content);
} else {
  console.log("No tienes permiso para leer el archivo");
}

//Crear carpetas de manera recursiva
// const outputDir = "output/files/documents";
if (process.permission.has("fs.write", "output/files/documents")) {
  const outputDir = join("output", "files", "documents"); //To use it for macOS (/) or Windows (\)
  await mkdir(outputDir, { recursive: true });

  //Escribir archivo
  const uppercaseContent = content.toUpperCase();
  // await writeFile("./archivo.txt", uppercaseContent);
  const outputFilePath = join(outputDir, "archivo-uppercase.txt");
  await writeFile(outputFilePath, uppercaseContent);
  console.log("Archivo actualizado");
} else {
  console.log("No tienes permiso para escribir en la carpeta");
}

console.log("La extensión es: ", extname(outputFilePath));
console.log("El nombre del archivo es: ", basename(outputFilePath));
