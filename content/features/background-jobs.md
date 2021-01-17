---
type: page
title: Background jobs
description: Compas background jobs
tags: []
order: 7
---

# Background jobs

Compas comes with a background job system backed by Postgres. Jobs may be
scheduled, have a priority and can be recurring.

## API

Provided by `@compas/store`.

### JobQueueWorker

A class representing a worker. By default a JobQueueWorker handles all jobs,
however it is possible to have a specific worker for jobs with specific names.

**constructor()**:

Create a new JobQueueWorker instance.

Parameters:

- `sql`: A Postgres connection. The connection should not be in a transaction
  already.
- `name` (string): Optional name that this JobQueueWorker will filter the jobs
  on. If not necessary, argument can be skipped.
- `options`:
  - `pollInterval` (number): Interval in milliseconds that the worker should
    look for new jobs. Is only used if no job is found directly after completing
    a job. Defaults to 1500 milliseconds
  - `parallelCount` (number): The number of parallel jobs to take on. This
    number should not be higher than the amount of connections your sql instance
    may create. Defaults to 1.
  - `handler` (function): The callback that is called on new jobs. If a job
    throws, the job is not marked as complete and retried most likely
    immediately. The handler is called with the following parameters:
    - `sql`: A Postgres connection already in transaction. If the transaction is
      aborted, the job is not marked complete.
    - `job`: The job, containing `name`, `data`, `priority`, `scheduledAt` and
      `createdAt` properties.

Returns a new `JobQueueWorker` instance that is not started yet.

**start()**:

Starts the worker if not already started. Returns synchronously.

**stop**:

Stops the worker if not already stopped. Already running jobs will finish, but
no new jobs will be picked up. Returns synchronously.

**pendingQueueSize()**:

Get the amount of pending jobs left. If `name` is passed in the constructor,
only pending jobs with the specified name will be returned.

Returns a promise that fulfills with an object.

- `pendingCount`: The amount of jobs to be done in the future
- `scheduledCount`: The amount of jobs that is waiting on an available worker
  now.

**averageTimeToCompletion()**:

Get the average time to job completion between the specified start and end
dates. If `name` is passed in the constructor, only jobs with the specified name
will calculated.

Parameters:

- `startDate` (Date): Date to filter jobs that completed after the specified
  timestamp.
- `endDate` (Date): Date to filter jobs that completed before the specified
  timestamp.

Returns a promise that fulfills with a number.

**Example**

```js
import { JobQueueWorker } from "@compas/store";

mainFn(import.meta, main);

async function main(logger) {
  const handler = (sql, { name, data }) => {
    if (name === "myImportantJob") {
      logger.info(data);
    } else {
      logger.error({
        message: "Unhandled job",
        name,
      });
    }
  };

  const worker = new JobQueueWorker(sql, {
    handler,
    parallelCount: 2,
  });

  worker.start();
  const startDate = new Date();
  const endDate = new Date();

  // Set startDate 3 days in the past
  startDate.setUTCDate(startDate.getUTCDate() - 3);

  logger.info({
    pendingQueueSize: await worker.pendingQueueSize(),
    averageTimeToCompletion: await worker.averageTimeToCompletion(
      startDate,
      endDate,
    ),
  });
  worker.stop();
}
```

### addJobToQueue

Inserts a new job in to the queue. This job can be completely empty and will
then default to an immediate job with the highest priority.

Parameters:

- `sql`: A Postgres connection, used to insert the job.
- `job`:
  - `name` (string): A job name, which would be used for dispatching the job in
    a generic JobQueueWorker, or can be filtered on in a specific JobQueueWorker
    instance
  - `scheduledAt` (Date): When this job should be executed, defaults to now
  - `priority` (number): Priority of this job. A higher number results in a
    lower priority. Defaults to `1`.

Returns a promise that is fulfilled with the `id` of the created job.

Examples:

```js
import { addJobToQueue } from "@compas/store";

await addJobToQueue(sql, {
  name: "myJob",
});
await addJobToQueue(sql, {
  name: "unimportantJob",
  priority: 10,
});
await addJobToQueue(sql, {
  name: "jobWithPayload",
  data: {
    my: "payload",
  },
});
```

### addRecurringJobToQueue

Wraps the passed in job specification in a built-in recurring job. The built-in
recurring job handles rescheduling of the job. When a recurring job is already
scheduled with the same name, all parameters are overwritten. The reschedule
mechanism will try to reschedule based on the previous `scheduledAt`. If the
newly calculated date is in the past, the calculation will happen with the
current timestamp.

Parameters:

- `sql`: A postgres connection, used to insert or upsert the job
- `options`:
  - `name` (string): The job name, dispatched via the normal job handler
  - `priority` (number): Priority that the scheduler should get, the scheduled
    job is always on a lower priority. Defaults to `1`
  - `interval` (object): Interval specification. At least a single key should
    exist.
    - years
    - months
    - days
    - hours
    - minutes
    - seconds

Returns a promise that is fulfilled once the insert or update has happened

Examples:

```js
import { addRecurringJobToQueue } from "@compas/store";

await addRecurringJobToQueue(sql, {
  name: "recurringJob",
  interval: {
    hours: 1,
  },
});
// Oops, override priority. This job is not important
await addRecurringJobToQueue(sql, {
  name: "recurringJob",
  priority: 5,
  interval: {
    hours: 1,
  },
});
```
