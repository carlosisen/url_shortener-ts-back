# Base image
FROM node:18

# Directorio de trabajo
WORKDIR /usr/src/app

# Copia de los archivos
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

# Instalación de dependencias
RUN npm install
RUN npm run build

COPY . .
# Expone el puerto de la aplicación
EXPOSE 8080

# Ejecuta la aplicación
CMD [ "npm", "start" ]