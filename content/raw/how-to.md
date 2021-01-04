---
type: page
title: How to
description: Compas old docs
tags: []
order: 3
---

# How to

A number of examples of how to utilise the functionalities provided by `@lbu/*`.
The How To's mention default arguments, ready to run examples and some possible
edge cases.

## Asserting on throws

Asserting on throws is another overlooked part of some test runners. This test
runner does not provide any fancy util like `t.throws(functionThatThrows)`, but
expects the user to use normal control flow like try / catch.

<!-- howto-test-pass-fail -->

```js
const throws = async () => {
  throw new Error("Oops!");
};

const doesNotThrow = () => {};

test("Throws vs not throws", async (t) => {
  try {
    await throws();
    t.fail(`The 'throws' function should have thrown.`);
  } catch (e) {
    t.equal(e.message, "Oops!");
  }

  try {
    doesNotThrow();
    t.pass("The function did not throw!");
  } catch (e) {
    t.fail(`The 'doesNotThrow' function did throw.`);

    // A logger from @lbu/insight is available
    t.log.error(e);
  }
});
```

## Execute Process

There are two ways to execute a program or `child_process` provided by
`@lbu/stdlib`:

- Exec, a promisified version of
  [`child_process#exec`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)

<!-- howto-exec -->

```js
const { stdout, stderr, exitCode } = await exec("echo 'foo'");
// stdout => "foo\n"
// stderr => ""
// exitCode => 0
```

<!-- howto-exec -->

- Spawn, a promisified version of
  [`child_process#spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)

<!-- howto-spawn -->

```js
const { exitCode } = await spawn("echo", ["bar"]);
// Outputs "bar\n" on stdout
// exitCode => 0
```

<!-- howto-spawn -->

By default `{ stdio: "inherit" }` is passed to `spawn` which means that all of
stdin, stdout and stderr are passed to the spawned process.

Use `exec` when further processing of stdout and stdin is needed or when you
want to ignore any output. Use `spawn` in other cases.
