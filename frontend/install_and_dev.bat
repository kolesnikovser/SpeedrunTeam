@echo off
rem -------------------------------------------------
rem  Установить npm‑зависимости и запустить Vite dev‑сервер
rem  (работает без ограничений PowerShell)
rem -------------------------------------------------
pushd %~dp0
echo Installing frontend dependencies...
npm install
if errorlevel 1 (
  echo *** ERROR: npm install failed ***
  popd
  exit /b 1
)

echo Starting Vite dev server...
npm run dev
popd
