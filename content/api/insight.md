---
type: page
title: "@compas/insight"
description: Public API of @compas/insight
tags: []
order: 1
---

# @compas/insight

## newLogger

_Available since 0.1.0_

_function newLogger(options?): Logger_

Create a new logger instance

**Parameters**:

- options `LoggerOptions?`

_[source](https://github.com/compasjs/compas/blob/main/packages/insight/src/logger/logger.js#L13)_

## newEvent

_Available since 0.1.0_

_function newEvent(logger): Event_

Create a new event from a logger

**Parameters**:

- logger `Logger`: Logger should have a context, like the default `ctx.log`

_[source](https://github.com/compasjs/compas/blob/main/packages/insight/src/events.js#L11)_

## newEventFromEvent

_Available since 0.1.0_

_function newEventFromEvent(event): Event_

Create a 'child' event, reuses the logger, adds callstack to the passed event

**Parameters**:

- event `Event`

_[source](https://github.com/compasjs/compas/blob/main/packages/insight/src/events.js#L28)_

## eventStart

_Available since 0.1.0_

_function eventStart(event, name): undefined_

Track event start times

**Parameters**:

- event `Event`
- name `string`

_[source](https://github.com/compasjs/compas/blob/main/packages/insight/src/events.js#L48)_

## eventStop

_Available since 0.1.0_

_function eventStop(event): undefined_

Track event end times and log if necessary

**Parameters**:

- event `Event`

_[source](https://github.com/compasjs/compas/blob/main/packages/insight/src/events.js#L80)_

## bytesToHumanReadable

_Available since 0.1.0_

_function bytesToHumanReadable(bytes?): string_

Convert bytes to a human readable value

**Parameters**:

- bytes `number?`

_[source](https://github.com/compasjs/compas/blob/main/packages/insight/src/memory.js#L11)_

## printProcessMemoryUsage

_Available since 0.1.0_

_function printProcessMemoryUsage(logger): undefined_

Print memory usage of this Node.js process

**Parameters**:

- logger `Logger`

_[source](https://github.com/compasjs/compas/blob/main/packages/insight/src/memory.js#L38)_
