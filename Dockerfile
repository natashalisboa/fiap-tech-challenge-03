# Imagem base oficial do Node
FROM node:18-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Fase final: serve os arquivos estáticos
FROM nginx:alpine

# Remove o default.conf do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o build para o nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia um arquivo de configuração customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]