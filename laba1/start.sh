#!/bin/bash

echo "=== Запуск API (json-server) ==="
# Запускаем json-server в фоне
npx json-server --watch db.json --port 8080 &
API_PID=$!

echo "=== Запуск Frontend (React) ==="
# Запускаем React приложение
npm start

# При остановке основного процесса убиваем json-server
trap "kill $API_PID 2>/dev/null" EXIT
