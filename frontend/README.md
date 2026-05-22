# Frontend – SpeedrunTeam

## О проекте

Это клиентская часть приложения **SpeedrunTeam**, построенная на **Vite**, **React** и **TypeScript**. Проект использует современный дизайн (градиенты, glass‑morphism) и подключается к бекенд‑API, который находится в корневой папке проекта.

## Запуск локально

> **Важно:** используйте `cmd.exe` (Command Prompt) либо PowerShell с отключённой политикой выполнения скриптов (`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`).

```cmd
cd C:\Users\Admin\Projects\SpeedrunTeam\frontend
npm install        # установить зависимости (один раз)
npm run dev        # запустить Vite dev‑сервер
```

Сервер будет доступен по адресу **http://localhost:5173/**. Откройте браузер и убедитесь, что отображается главная страница «Добро пожаловать в SpeedrunTeam».

## Сборка для продакшн

```cmd
npm run build   # собрать статические файлы в папку dist
```
Собранные файлы будут помещены в `frontend/dist` и могут быть обслужены любым веб‑сервером (например, Nginx).

## Docker

Для развёртывания фронтенда в Docker используется `frontend/Dockerfile`. Чтобы собрать и запустить контейнер вместе с API, выполните из корня проекта:

```cmd
cd C:\Users\Admin\Projects\SpeedrunTeam
docker compose up --build
```

- **API** будет доступен на `http://localhost:3000/` (порт 3000).
- **Frontend** будет обслуживаться Nginx на `http://localhost/` (порт 80).

## Полезные команды

- `npm run preview` – запустить локальный сервер, обслуживающий уже собранную версию (`dist`).
- `npm run lint` – (если добавить lint) проверить код на стиль.

## Лицензия

MIT © Колесников С.А.
