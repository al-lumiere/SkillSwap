## Как запустить проект

Необходимо скачать репозиторий с проектом себе на компьютер, для этого нужно скопировать SSH репозитория и выполнить команду

```
git clone /SSH/
```

Сейчас проект есть локально на компьютере, вы на локальной ветке main, но нужно быть в ветке develop. Для этого

```
git checkout develop
```

Дальше необходимо установить зависимости проекта, выполнив команду

```
npm install
```

Чтобы переменные окружения появились у вас, выполните команду, файл .env будет на вашей машине со значениями из файла .env.example и .env будет добавлен в .gitignore.

```
cp .env.example .env
```

От ветки develop нужно отвести свою ветку

```
git checkout -b feature/some-new-feature
```

и вносить изменения в своей ветке.

## Как иметь актуальные изменения у себя в локальном репозитории

Основаная ветка проекта - develop. Все другие ветки должны быть созданы от неё.
Когда вы только что склонировали проект из GitHub, сделайте следующее:

```
git checkout develop
```

```
git checkout -b feature/your-feature-name
```

Вносите изменения только в своей ветке.

Если на GitHub были вмержены изменения в develop, ваш локальный develop будет отличаться. Чтобы подтянуть актуальные данные _в вашу рабочую ветку_ выполните комнаду, _находясь в вашей рабочей ветке_

```
git fetch
```

```
git rebase origin/develop
```

## Стек проекта

- Vite для сборки кода
- ESLinter по гайдлайнам Airbnb
- Prettier
- React + TypeScript
- Husky + commitlint - проверка коммитов на соответсвие Conventional Commits
- React Router TBD
- ReduxToolKit TBD
- Jset TBD

## Доступные скрипты

Для собрки проекта

```
npm run build
```

Для запуска локального сервера

```
npm run dev
```

Для запуска линтера. Он работает по мере написания кода, но также можно в терминале просмотреть информацию по ошибкам.

```
npm run lint
```

Для форматирования кода, проверит все файлы в проекте

```
npm run format
```

## Про Conventional Commits

Сообщение коммита должно начинаться со слов feat, fix, chore, docs, refactor, test, style.

Пример плохого коммита

```
git commit -m "плохой коммит"
```

В таком случае в терминале будет ошибка, коммит не будет выполнен

```
husky - DEPRECATED

Please remove the following two lines from .husky/commit-msg:

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

They WILL FAIL in v10.0.0

⧗   input: плохой тестовый коммит
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```

Пример хорошо коммита

```
git commit -m "feat: реализовать иконку для хедера"
```

В терминале будет такое сообщение

```
husky - DEPRECATED

Please remove the following two lines from .husky/commit-msg:

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

They WILL FAIL in v10.0.0

[chores/setup-project 8ccbfd3] chore: настроить husky и commitlint для conventional commits
2 files changed, 24 insertions(+), 5 deletions(-)
```

Сообщение husky - DEPRECATED это сообщение на будущее, когда будет релизнута более новая версия. Всё работает.

## Как создавать UI компонент

- В папке src/shared/ui создать _папку_ с названием компонента, название с маленькой буквы, слова разделены дефисом
- Внутри папки компонента создать файлы:
  - index.ts - для экспорта компонента
  - some-component.modules.css - для стилей
  - some-component.tsx - для кода самого компонента
  - type.ts - для типизации пропсов компонента

Если компонент не предполагает наличие пропсов, то файл с типом не нужен и сам копонент можно не типизировать. В остальных случаях файл и типизация нужны. Чтобы компонент отобразился, его нужно импортировать в App и вернуть его из функции.
