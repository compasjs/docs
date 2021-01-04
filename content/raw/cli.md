---
type: page
title: CLI
description: Compas old docs
tags: []
order: 1
---

# CLI

The CLI provides a template and some useful commands. It includes watch and
reloading of scripts, linting, testing and more.

Run `yarn lbu help` for more information.

## Benchmarking

Working a lot like the test runner, this package also exposes a benchmark
runner. We also have two exports related to benchmarking:

- mainBenchFn: Inline with `mainTestFn`, wraps `mainFn` to start the runner if
  necessary.
- bench: Register a benchmark

The runner works by calling your callback with an increasing value on `b.N`. The
callback should then loop `b.N` times while doing the benchmarked operation. If
a callback invocation takes longer than 1 second, or the maximum value of `b.N`
is reached, the average nanoseconds per operation is calculated and printed with
the other results.

When setup is needed you can call `b.resetTime()` can be called. Note that
benchmarking in JavaScript is hard, and the results should be taken with a grain
of salt.
