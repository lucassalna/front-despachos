# Etapa 1: build del frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias y archivos
COPY package*.json ./
RUN npm install

COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: imagen final con Nginx
FROM nginx:alpine

# Copiar archivos compilados al contenedor de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto por defecto de Nginx
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
