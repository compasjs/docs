---
type: page
title: API Documentation
description: Compas API documentation
tags: []
order: 3
---

# API

The public compas API, a work in progress.

<!-- marker -->

## @compas/insight

- [newLogger](/api/insight.html#newlogger)
- [newEvent](/api/insight.html#newevent)
- [newEventFromEvent](/api/insight.html#neweventfromevent)
- [eventStart](/api/insight.html#eventstart)
- [eventStop](/api/insight.html#eventstop)
- [bytesToHumanReadable](/api/insight.html#bytestohumanreadable)
- [printProcessMemoryUsage](/api/insight.html#printprocessmemoryusage)

## @compas/stdlib

- [mainFn](/api/stdlib.html#mainfn)
- [filenameForModule](/api/stdlib.html#filenameformodule)
- [dirnameForModule](/api/stdlib.html#dirnameformodule)
- [isProduction](/api/stdlib.html#isproduction)
- [isStaging](/api/stdlib.html#isstaging)
- [refreshEnvironmentCache](/api/stdlib.html#refreshenvironmentcache)
- [isNil](/api/stdlib.html#isnil)
- [isPlainObject](/api/stdlib.html#isplainobject)
- [uuid](/api/stdlib.html#uuid)
- [noop](/api/stdlib.html#noop)
- [merge](/api/stdlib.html#merge)
- [streamToBuffer](/api/stdlib.html#streamtobuffer)
- [pathJoin](/api/stdlib.html#pathjoin)
- [exec](/api/stdlib.html#exec)
- [spawn](/api/stdlib.html#spawn)
- [processDirectoryRecursive](/api/stdlib.html#processdirectoryrecursive)
- [processDirectoryRecursiveSync](/api/stdlib.html#processdirectoryrecursivesync)
- [flatten](/api/stdlib.html#flatten)
- [unFlatten](/api/stdlib.html#unflatten)
- [getSecondsSinceEpoch](/api/stdlib.html#getsecondssinceepoch)

## @compas/cli

- [test](/api/cli.html#test)
- [mainTestFn](/api/cli.html#maintestfn)
- [newTestEvent](/api/cli.html#newtestevent)
- [bench](/api/cli.html#bench)
- [mainBenchFn](/api/cli.html#mainbenchfn)

## @compas/store

- [newPostgresConnection](/api/store.html#newpostgresconnection)
- [setStoreQueries](/api/store.html#setstorequeries)
- [query](/api/store.html#query)
- [isQueryPart](/api/store.html#isquerypart)
- [stringifyQueryPart](/api/store.html#stringifyquerypart)
- [explainAnalyzeQuery](/api/store.html#explainanalyzequery)
- [newMigrateContext](/api/store.html#newmigratecontext)
- [getMigrationsToBeApplied](/api/store.html#getmigrationstobeapplied)
- [runMigrations](/api/store.html#runmigrations)
- [addJobToQueue](/api/store.html#addjobtoqueue)
- [addRecurringJobToQueue](/api/store.html#addrecurringjobtoqueue)
- [newSessionStore](/api/store.html#newsessionstore)
- [newMinioClient](/api/store.html#newminioclient)
- [ensureBucket](/api/store.html#ensurebucket)
- [removeBucket](/api/store.html#removebucket)
- [listObjects](/api/store.html#listobjects)
- [removeBucketAndObjectsInBucket](/api/store.html#removebucketandobjectsinbucket)
- [createOrUpdateFile](/api/store.html#createorupdatefile)
- [copyFile](/api/store.html#copyfile)
- [getFileStream](/api/store.html#getfilestream)
- [syncDeletedFiles](/api/store.html#syncdeletedfiles)
- [hostChildrenToParent](/api/store.html#hostchildrentoparent)
- [updateFileGroupOrder](/api/store.html#updatefilegrouporder)
- [createTestPostgresDatabase](/api/store.html#createtestpostgresdatabase)
- [cleanupTestPostgresDatabase](/api/store.html#cleanuptestpostgresdatabase)

## @compas/server

- [getApp](/api/server.html#getapp)
- [sendFile](/api/server.html#sendfile)
- [createBodyParsers](/api/server.html#createbodyparsers)
- [session](/api/server.html#session)
- [compose](/api/server.html#compose)
- [createTestAppAndClient](/api/server.html#createtestappandclient)
- [closeTestApp](/api/server.html#closetestapp)

<!-- marker -->
