# Этап сборки
FROM node:18-alpine as build

ARG REACT_APP_API_URL=http://api:8080
ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app

# Копируем package файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап продакшена с nginx
FROM nginx:alpine

# Копируем сборку в nginx
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
