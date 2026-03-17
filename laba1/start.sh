#!/bin/bash

echo "=== Запуск API (json-server) ==="
# Запускаем json-server в фоне, явно указываем хост 0.0.0.0
npx json-server --watch db.json --host 0.0.0.0 --port 8080 &
API_PID=$!
sleep 2

echo "=== Запуск Frontend (React) ==="
# Устанавливаем переменную окружения для API
export REACT_APP_API_URL=http://localhost:8080
npm start

# При остановке основного процесса убиваем json-server
trap "kill $API_PID 2>/dev/null" EXIT
