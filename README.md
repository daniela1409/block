Este desarrollo está realizado con expressjs, framework de nodejs. 
1. Primero se debe clonar el repositorioPara
2. Para correr el proyecto lo primero es tener instalado nodejs
3. Abrir el proyecto en el ide de preferencia. Desde consola se debe correr el siguiente comando para instalar las dependencias necesarias:
   npm install
4. Ahora puede correr el siguiente comando para ejecutar el desarrollo:
   npm run dev


Para que se corra de manera correcta, se agregó al repositorio el archivo .env que tiene las variables globales, las cuales contienen la conexión a la base de datos mongodb

Dentro del repositorio hay una colección de postman que contiente los 5 endpoints a los que se deberá hacer los llamados para llevar a cabo los flujos del blockchain:

1. Enviar transacción: Genera una trasacción, la cual a ser hasheada y almacenada en base de datos. A las 4 transacciones se genera un nuevo bloque (por facilidad para crear el root hash
2. Obtener bloques para minar: Este endpoint devolverá los bloques que ya están listos para minar, esto con la intención de que el minero pueda escoger el bloque a minar
3. Minar un bloque: Minará un bloque que el minero haya escogido. Aquí se asignara bloque precio, hashroot y a partir de esto se haya el hash del encabezado del bloque y el Nonce
4. Obtener bloques minados, listos para confirmar: Esto permitirá visualizar que bloques fueron ya minados y se puede entrar a confirmar para agregarlos a la cadena de bloques (blockchain)
5. Confirmar bloque: Confirmará se el bloque si está correctamente minado y que todas sus transacciones sean validad y así agregar el bloque al blockhain
