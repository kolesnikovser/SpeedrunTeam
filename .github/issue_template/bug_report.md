name: 🐛 Сообщение об ошибке (Bug Report)
description: Сообщить о технической проблеме или ошибке в работе приложения.
title: "[BUG] "
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Спасибо, что помогаете улучшать **SpeedrunTeam**! Пожалуйста, заполните форму ниже, чтобы мы могли быстрее разобраться с проблемой.
  - type: textarea
    id: description
    attributes:
      label: Описание ошибки
      description: Четкое и лаконичное описание того, что идет не так.
      placeholder: Например, при переходе на вкладку "Записи" возникает бесконечная загрузка...
    validations:
      required: true
  - type: textarea
    id: reproduction
    attributes:
      label: Шаги для воспроизведения
      description: Пожалуйста, опишите шаги, необходимые для воспроизведения проблемы.
      value: |
        1. Запустить сервер командой `npm start`
        2. Открыть браузер на `http://localhost:3005`
        3. Перейти в раздел "..."
        4. Нажать на кнопку "..."
        5. Увидеть ошибку.
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: Ожидаемое поведение
      description: Что должно происходить вместо ошибки.
      placeholder: Форма должна успешно сохраняться и отображать новую запись в таблице...
    validations:
      required: true
  - type: textarea
    id: environment
    attributes:
      label: Окружение
      description: Операционная система, браузер, версия Node.js и т.д.
      value: |
        - ОС: Windows 10
        - Браузер: Google Chrome 124
        - Node.js: v24.16.0
    validations:
      required: false
  - type: textarea
    id: logs
    attributes:
      label: Логи или Скриншоты
      description: Прикрепите консольный вывод или скриншоты ошибки (если есть).
      placeholder: Вставьте сюда логи терминала или консоли браузера...
    validations:
      required: false
