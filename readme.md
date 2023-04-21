# Task Manager
Приложение для создания и отслеживания статуса задач

## Запуск

1. `git clone https://github.com/andreyatx/project-A1.git`

2. `cd project-A1`

3. `yarn`

4. `yarn dev`

## Технологии

Приложение написано с использованием *React* + *typescript*. Сборщик *vite* и бэкенд на *firebase*.

* [React](https://react.dev/) - javascript библиотека для разработки пользовательских интерфейсов
* [typescript](https://www.typescriptlang.org/) - надстройка над javascript, добавляющая строгую типизацию
* [redux-toolkit](https://redux-toolkit.js.org/)- набор инструментов для облегчения работы с менеджер состояний redux
* [postcss](https://postcss.org/) - инструмент для трансформирования css-стилей с помощью javascript
* [tailwind](https://tailwindcss.com/) - CSS-фреймворк,  позволяет создавать UI при помощи набора готовых классов (в данном проекте tailwind установлен как плагин для postcss)
* [daisyUI](https://daisyui.com/) - библиотека готовых компонентов, использующая tailwind
* [firebase](https://firebase.google.com/) - сервис Google, предоставляющий облачные решения. Используется для бэкенда. В firebase подключены:
  * *firestore database* - база данных
  * *authentication* - сервис аутенфикации
  * *hosting* - хостинг
* [vite](https://vitejs.dev/) - сборщик модулей
* [yarn](https://yarnpkg.com/) - пакетный менеджер
* [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) - вспомогательный пакет, для реализации drag-n-drop
* [react-hook-form](https://react-hook-form.com/) - вспомогательный пакет для работы с формами