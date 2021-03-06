---
type: page
title: Logger
description: Compas logger
tags: []
order: 1
---

# Logger

Although the stdlib package exports more than just a logger, this document will
focus on the logger.

## API

Provided by `@compas/stdlib`

### newLogger

This function constructs a new logger. The logger supports a log context and
pretty printing when asked.

Parameters:

- `options`:
  - `disableInfoLogger` (boolean): Replaces log.info with a 'noop'. Defaults to
    'false'.
  - `disableErrorLogger` (boolean): Replaces log.error with a 'noop'. Defaults
    to 'false'.
  - `printer` (`"pretty"|"ndjson"|"github-actions"|undefined`): The log printer
    to use. Automatically inferred from the env variables.
  - `stream` (Stream): The stream to write to, defaults to `process.stdout`.
    This is the intended use case. Although streams to files may work, this is
    not supported.
  - `ctx` (object): Any context to add to log lines. This value is copied
    immediately on logger creation, so changes made via a reference, will not be
    reflected.

A logger is a plain JavaScript object with 3 functions:

**info** and **error**:

The info and error function accept a single argument that is logged. This
happens in a single `write` call when pretty printing or not.

## On log levels and processing

Log levels are used to get some ranking based on importance in your log lines.
Compas only knows 2 log levels: info and error. A log line is either important
enough to warn you, or it is not. By simplifying this decision, you can spend a
bit more time deciding if you really need to log that information or not.

There is much more information in logs than just the contrasting error- and
info-'level', however this always requires further processing. Compas prefers
that this happens outside the current process. That is why by default we write
everything to `stdout`. To accommodate processing, every log line is a valid
JSON string, also called newline delimited JSON or NDJSON for short. The log
line is structured as follows:

```json5
// Created with `log.info({ hello: "world" });`
{
  // The log level, either 'info' or 'error'
  level: "info",
  // Current date and time formatted as ISO8601-string
  timestamp: "2021-01-19T21:17:11.693Z",
  // The `ctx` that is passed in `newLogger`
  // In this case the default by `mainFn` from `@compas/stdlib`
  context: {
    // File name without extension
    type: "api",
    // Value of process.env.APP_NAME, see environment variable docs
    application: "compas",
  },
  // The value passed in to the log function
  // So can be an object, array, string, boolean, ...
  message: {
    hello: "world",
  },
}
```

The log-processor can take these lines and do whatever is needed to check on
'indirect' errors like a spike of unauthorized requests.
