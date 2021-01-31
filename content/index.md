---
type: page
title: Compas
description: Unified backend tooling
tags: []
order: 1
---

# Compas

Unified backend tooling

---

## Features

- Script and test runner with built-in watcher
- Flexible code generators supporting routers, validators, api clients and
  Postgres queries
- Structured logger
- Common utilities like session handling, job queue, file storage and loading
  '.env' files

## Requirements

- Node.js >= 14
- Yarn 1.x.x

## Sneak peak

A small peak in how what the code generators can help you with:

### Validators

A quick showcase of the TypeCreator and how the resulting functions can be used

```js
import { App, TypeCreator } from "@compas/code-gen";

const app = new App();

app.add(
  T.object("user").keys({
    name: T.string().min(3),
    height: T.number()
      .float()
      .max(2.2)
      .docs("Height in meters, we don't support giants"),
    wantsSpamEmail: T.bool().default(false),
  }),
);

app.generate({
  outputDirectory: "./generated/validators",
  enabledGenerators: ["type", "validator"],
});
```

And some examples of how to use the generated code:

```js
import { uuid } from "@compas/stdlib";
import { validateAppTodo } from "./generated/validators/index.js";

// Throws AppError: validator.string.undefined at $.name
validateAppTodo({});

// Throws AppError: validator.string.min at $.name, min: 3
validateAppTodo({
  name: "Ab",
});

const user = validateAppTodo({
  name: "Dirk",
  height: 1.88,
});
// user.wantsSpamEmail === false
```

### Router and api clients

Showing the api client and react-query based hooks as generated for an api
consumer. Backend structure:

```js
import { App, TypeCreator } from "@compas/code-gen";

const app = new App();
const T = new TypeCreator("todo");
const R = T.router("/todo");

const todo = T.object("item").keys({
  id: T.uuid(),
  value: T.string(),
  done: T.bool(),
});

app.add(
  R.get("/", "list").response({
    list: [todo],
  }),

  R.get("/:todoId", "single")
    .params({
      todoId: T.uuid(),
    })
    .response({
      todo,
    }),

  R.post("/", "create")
    .body({
      value: T.string(),
    })
    .response({
      todo,
    }),

  R.post("/:todoId/complete", "markComplete").response({
    success: true,
  }),
);

// ... app.generate
```

Once the frontend is generated, see the [client-setup](TODO), it can be used as
follows:

```tsx
function renderTodo({ todoId }: TodoSingleParams) {
  // Generated react-query hook with typed results
  const { data } = useTodoSingle({ todoId });
  // data.id, data.value, data.done

  return <div>{/*...*/}</div>;
}

function renderTodoList() {
  // Typed api client
  const api = useApi();
  const markTodoComplete = (todoId: string) =>
    api.todo.markComplete({ todoId });

  return <div>{/*...*/}</div>;
}
```

## Why

My work involved doing many small projects. I had a hard time backporting
incremental fixes to existing projects. To facilitate my needs more and to stop
copying and pasting things around, this project was born.

## Docs and development

See [the website](https://compasjs.com) for the changelog, all available APIs
and various guides.

For contributing see [contributing.md](https://compasjs.com/contributing).

## New features

New features added should fall under the following categories:

- It improves the interface between api and client in some way. An example may
  be to support websockets in @compas/code-gen
- It improves the developer experience one way or another while developing an
  api For example the `compas docker` commands or various utilities provided by
  @compas/stdlib

Although some parts heavily rely on conventions set by the packages, we
currently aim not to be a framework. We aim to provide a good developer
experience, useful abstractions around the basics, and a stable backend <->
client interface.
