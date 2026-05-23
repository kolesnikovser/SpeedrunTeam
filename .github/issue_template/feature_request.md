name: 💡 Предложение новой функции (Feature Request)
description: Предложить новую идею, улучшение или функционал для проекта.
title: "[FEATURE] "
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        У вас есть отличная идея для **SpeedrunTeam**? Мы с радостью выслушаем ваши предложения!
  - type: textarea
    id: problem
    attributes:
      label: Связана ли идея с какой-то проблемой?
      description: Опишите, с каким затруднением вы сталкиваетесь при использовании приложения.
      placeholder: Например, мне неудобно вручную вбивать дату забега каждый раз...
    validations:
      required: false
  - type: textarea
    id: solution
    attributes:
      label: Какое решение вы предлагаете?
      description: Опишите предлагаемую функцию и то, как вы её себе представляете.
      placeholder: Например, добавить кнопку "Сегодня" в календарь формы добавления результата...
    validations:
      required: true
  - type: textarea
    id: alternatives
    attributes:
      label: Альтернативные варианты
      description: Опишите альтернативные решения или обходные пути, которые вы рассматривали.
    validations:
      required: false
  - type: textarea
    id: context
    attributes:
      label: Дополнительный контекст
      description: Любая другая информация, схемы, макеты или скриншоты, которые могут помочь.
    validations:
      required: false
