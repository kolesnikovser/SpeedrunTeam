# SpeedrunTeam

## О проекте

**SpeedrunTeam** – это полностековое приложение для управления командами в скоростных забегах. В проекте реализованы:

- **Backend** на Node.js + Express с SQLite (через `sql.js`).
- **Frontend** на Vite + React + TypeScript с современным дизайном (градиенты, glass‑morphism).
- **Docker**‑контейнеры и `docker‑compose.yml`, позволяющие запускать API и UI одним параметром.

## Структура репозитория

```
SpeedrunTeam/
├─ backend/               # Express‑сервер (src/ и Dockerfile)
├─ frontend/              # Vite‑React приложение
│   ├─ src/
│   ├─ Dockerfile         # multi‑stage сборка, Nginx
│   └─ vite.config.ts
├─ docker-compose.yml      # оркестрирует api и frontend
├─ .gitignore
└─ README.md               # (это) руководство
```

## Локальная разработка

### Backend
```cmd
cd backend
npm install
npm run dev   # сервер на http://localhost:3000
```

### Frontend
```cmd
cd frontend
npm install
npm run dev   # UI на http://localhost:5173
```

## Docker‑развёртывание
```cmd
cd SpeedrunTeam
docker compose up --build
```
- API доступен по `http://localhost:3000/`.
- Frontend обслуживается Nginx по `http://localhost/`.

## CI/CD (GitHub Actions)
Автоматически собирает и публикует Docker‑образы, а также проверяет корректность сборки.

## Коммит и пуш
```cmd
git add .
git commit -m "Finish project: add README, CI, Docker compose"
git push origin main
```

## Лицензия
MIT © Колесников С.А.
