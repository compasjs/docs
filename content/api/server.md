---
type: page
title: "@compas/server"
description: Public API of @compas/server
tags: []
order: 4
---

# @compas/server

## getApp

_Available since 0.1.0_

_function getApp(opts?): Application_

Create a new Koa instance with default middleware applied.

Create a new Koa instance with default middleware applied. Adds the following: -
Health check route on `/_health` <br> - Log middleware to add the Logger from
@compas/stdlib on `ctx.log` <br> - Error handler to catch any errors thrown by
route handlers <br> - A 404 handler when no response is set by other middleware
<br> - Default headers to respond to things like CORS requests

**Parameters**:

- opts `GetAppOptions={}`

_[source](https://github.com/compasjs/compas/blob/main/packages/server/src/app.js#L31)_

## sendFile

_Available since 0.1.0_

_function sendFile(ctx, file, getStreamFn): Promise<undefined>_

Send a `StoreFile` instance from @compas/store as a `ctx` response. Handles byte
range requests as well. May need some improvements to set some better cache
headers.

**Parameters**:

- ctx `Context`
- file `SendFileItem`
- getStreamFn `GetStreamFn`

_[source](https://github.com/compasjs/compas/blob/main/packages/server/src/middleware/sendFile.js#L15)_

## createBodyParsers

_Available since 0.1.0_

_function createBodyParsers(bodyOpts?, multipartBodyOpts?): BodyParserPair_

Creates a body parser and a body parser with multipart enabled. Note that
koa-body parses url-encoded, form data, json and text by default.

**Parameters**:

- bodyOpts `KoaBodyOptions={}`: Options that will be passed to koa-body
- multipartBodyOpts `IFormidableBodyOptions={}`: Options that will be passed to
  formidable

_[source](https://github.com/compasjs/compas/blob/main/packages/server/src/middleware/body.js#L37)_

## session

_Available since 0.1.0_

_function session(app, opts): Middleware_

Session middleware. Requires process.env.APP_KEYS to be set. To generate a key
use something like:
`node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`.
This also accepts the session store as provided by `@compas/store`.

**Parameters**:

- app `Application`
- opts `SessionOptions`: KoaSession options

_[source](https://github.com/compasjs/compas/blob/main/packages/server/src/middleware/session.js#L17)_

## compose

_Available since 0.1.0_

_function compose(middleware): Middleware_

Compose `middleware` returning of all those which are passed.

**Parameters**:

- middleware `Array`

_[source](https://github.com/compasjs/compas/blob/main/packages/server/src/middleware/compose.js#L16)_

## createTestAppAndClient

_Available since 0.1.0_

_function createTestAppAndClient(app, axios): Promise<undefined>_

Open the provided Koa app on a random port, and use the port to set the
'baseURL' on the provided Axios instance.

**Parameters**:

- app `Application`
- axios `AxiosInstance`

_[source](https://github.com/compasjs/compas/blob/main/packages/server/src/testing.js#L11)_

## closeTestApp

_Available since 0.1.0_

_function closeTestApp(app): Promise<undefined>_

Close the test app as created by `createTestAppAndClient`.

**Parameters**:

- app `Application`

_[source](https://github.com/compasjs/compas/blob/main/packages/server/src/testing.js#L40)_
