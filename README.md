![OpenFaaS](https://img.shields.io/badge/openfaas-serverless-blue.svg)

## skej

#### a simple event schedular for OpenFaaS

Skej allows you to declaratively schedule events for OpenFaaS functions.

#### How To

###### Prerequisites
Requires NodeJS version 6.4.0 and up.

Redis should be running on port 6379. This is easy to do with docker
```
docker run -d -p 6379:6379 redis
```

`skej` will try to autoconfigure redis to support expiring keys, but you may need to use `redis-cli` if it doesn't cooperate.
```
$ redis-cli
> config set notify-keyspace-events Ex
```

###### Install
```
$ npm install skej
```

###### Import skej

```
const skej = require('skej')
```

###### Write the schedule
Declare your schedule as a JSON object.

There are two types of scheduled functions `single` and `pipe`.
One off and recurring functions would fall under `single` and can be
scheduled like so.
```
// index.js
const schedule = {
	single: [
		{
			name: 'func_nodeinfo',
			initialRun: 5,
			onFinished: x => console.log(x.body)
		},
		{
			name: 'func_echoit',
			data: 'hello world',
			initialRun: 2,
			recurring: 10,
			onFinished: x => console.log(x.body)
		},
	],
}
```
Notice that the `func_echoit` function has an addition property,
`recurring`. If the function should run more than once, at a regular
interval, set the recurring flag to the appropriate duration in seconds.
`skej` will handle the rest.

Adding a chain of functions requires grouping functions as `pipe`
functions. Give the 'pipeline' a name, include and initial data that
should be passed to the first function, and list the function names under
`pipeline`
```
// index.js
  ...
	pipe: [
		{
			name: 'test',
			data: '',
			initialRun: 8,
			pipeline: [
				'func_nodeinfo',
				'func_wordcount'
			],
			onFinished: x => console.log(x.body)
		}
	]
}

/*
wrap schedule in the skej() function
and include the OpenFaaS gateway URL, defaults to http://localhost:8080
if no URL is supplied
*/
skej(schedule, 'http://11.11.11.11:8080')
```
See the `example.js` file for the completed description.

###### Launching
```
node index.js
```

###### ToDo
* Remove hardcoded gateway URL
* Ability to schedule to same function multiple times, name and
	function name should be seperate properties


###### Additional
Give it a try and please submit issues as you have them.

