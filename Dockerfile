# Использовать официальный образ Node.js в качестве базового
FROM node:18

# Установить рабочую директорию
WORKDIR /app

# Скопировать package.json и package-lock.json
COPY package*.json ./

# Установить зависимости
RUN npm install

# Скопировать остальные файлы и каталоги
COPY . .

# Сборка статического сайта Nuxt.js
RUN npm run generate

# Установить переменную окружения для статического режима
ENV NUXT_HOST=0.0.0.0

# Установить порт, который будет прослушивать контейнер
EXPOSE 8080

# Запустить приложение Nuxt.js в режиме сервера для статических файлов
CMD ["npm", "run", "start"]


