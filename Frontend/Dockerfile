# Requerir imagen
FROM node:14-alpine

# Crear carpeta de trabajo 
WORKDIR /app

# Copiar archivos con dependencias
COPY package*.json ./

# Ejecutar comando para instalar dependencias
RUN npm install

# Copiar todos los archivos del proyecto al WORKDIR
COPY . .

# Ejecutar la aplicacion
CMD ["npm", "start"]