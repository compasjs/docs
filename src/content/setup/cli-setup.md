# Setting up the CLI and linting

Of course a project needs linting and Compas provides a 2-step approach:

- Lint configuration via `@compas/lint-config`
- Running the linter via `@compas/cli`

Start with installing the dependencies:

```shell
yarn add @compas/lint-config @compas/cli --exact --dev
```

### Configuration

The `@compas/lint-config` provides a Prettier config and ESLint configuration.
This totals in three files created in your project:

**/.eslintrc.cjs**

```js
/* eslint-disable import/no-commonjs */

module.exports = {
  extends: ["./node_modules/@compas/lint-config"],
  root: true,
};
```

**/.prettierrc.cjs**

```js
/* eslint-disable import/no-commonjs */

module.exports = {
  ...require("@compas/lint-config/prettierrc.js"),
};
```

**/.prettierignore**

```ignorelang
coverage/**
```

This way you should be able to easily override any configuration if necessary.
By following the respective guides / configuration options:

- [ESLint](https://eslint.org/docs/user-guide/configuring#configuring-rules)
- [Prettier](https://prettier.io/docs/en/options.html)
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import/)

Now is also a good time to set up your IDE to use your local configuration.

### Running the linter

At the moment we have only configured the underlying tools but have not run
anything yet. This is where `@compas/cli` comes in. This package also has a
range of features, but for now we focus on two of them. Let's start with running
the linters:

```shell
yarn compas lint
```

> When using NPM use `npx compas lint`

This runs both ESLint and Prettier in auto fix mode over your Javascript files.
Prettier will also look at plain JSON and Markdown files.

There is also an environment variable available that runs Prettier in 'check'
mode. This way it will only report errors and not run the auto fixer. This can
be enabled by setting `CI=true`:

```shell
export CI=true
yarn compas lint
unset CI
```

This environment variable is also document in [Environment variables](TODO)

### Running scripts

TODO
