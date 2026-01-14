import os from "node:os";
import ms from "ms";

console.log("Información del sistema operativo");
console.log("Nombre del sistema operativo:", os.platform());
console.log("Versión del sistema operativo:", os.release());
console.log("Arquitectura del sistema:", os.arch());
console.log("Número de núcleos:", os.cpus().length);
console.log("Memoria total:", os.totalmem());
console.log("Memoria libre:", os.freemem());

console.log("Nombre del usuario:", os.userInfo().username);
console.log("Directorio de inicio:", os.homedir());
console.log("Directorio temporal:", os.tmpdir());

console.log("CPUs", os.cpus());

console.log(
  "Tiempo de actividad del sistema (segundos):",
  ms(os.uptime() * 1000, { long: true }),
);
