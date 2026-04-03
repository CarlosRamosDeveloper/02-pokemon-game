# Build stage
FROM node:lts-alpine AS build
WORKDIR /app

# Copiar package.json primero
COPY package*.json ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install

# Copiar todo el proyecto
COPY . .

# Build de producción de Vite
RUN pnpm build

# Runtime stage
FROM node:lts-alpine
WORKDIR /app

RUN npm install -g http-server

# Copiar solo la carpeta dist del build
COPY --from=build /app/dist ./dist

EXPOSE 5173
CMD ["http-server", "dist"]