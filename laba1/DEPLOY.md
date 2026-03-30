# Инструкция по развёртыванию на Apache

## 1. Сборка приложения

```bash
npm run build
```

После сборки появится папка `build` с готовыми статическими файлами.

---

## 2. Загрузка файлов на сервер

### Загрузка сборки на сервер:
```bash
scp -P 6666 -r ./build root@ssh.cloud.nstu.ru:/var/www/laba1/
```

### Загрузка конфигурации Apache:
```bash
scp -P 6666 laba1.conf root@ssh.cloud.nstu.ru:/etc/apache2/sites-available/
```

---

## 3. Настройка на сервере

### Подключиться к серверу по SSH:
```bash
ssh -P 6666 root@ssh.cloud.nstu.ru
```

### Включить необходимые модули Apache:
```bash
# Модуль для перезаписи URL (нужен для React Router)
a2enmod rewrite

# Модули для проксирования (если используете API на отдельном порту)
a2enmod proxy
a2enmod proxy_http
```

### Включить сайт:
```bash
a2ensite laba1.conf
```

### Проверить конфигурацию на ошибки:
```bash
apache2ctl configtest
```

### Перезапустить Apache:
```bash
systemctl restart apache2
```

---

## 4. Запуск API (json-server)

На сервере запустите json-server для API:

```bash
# Установить json-server глобально
npm install -g json-server

# Запустить API (в фоне или через systemd/tmux)
cd /var/www/laba1
nohup json-server --watch db.json --host 0.0.0.0 --port 3001 &
```

---

## 5. Проверка работы

Откройте в браузере:
- Сайт: `http://your_domain.com`
- API: `http://your_domain.com:8080/incidents`

---

## Полезные команды

| Команда | Описание |
|---------|----------|
| `a2ensite laba1.conf` | Включить сайт |
| `a2dissite laba1.conf` | Выключить сайт |
| `apache2ctl configtest` | Проверить ошибки конфигурации |
| `systemctl restart apache2` | Перезапустить Apache |
| `systemctl status apache2` | Статус Apache |

---

## Загрузка файлов с сервера

### Скачать конфиг:
```bash
scp -P 6666 root@ssh.cloud.nstu.ru:/etc/apache2/sites-available/laba1.conf ./
```

### Скачать всю директорию:
```bash
scp -P 6666 -r root@ssh.cloud.nstu.ru:/var/www/laba1 ./
```
