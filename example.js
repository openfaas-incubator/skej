'use strict';

const skej = require('./index');

skej({

	single: [
		{
			name: 'func_nodeinfo',
			initialRun: 5,
			onFinished: x => console.log('func_nodeinfo:', x.body)
		},
		{
			name: 'func_echoit',
			data: 'hello world',
			initialRun: 2,
			recurring: 1,
			onFinished: x => console.log('func_echoit:', x.body)
		},
		{
			name: 'foo',
			json: true,
			initialRun: 1,
			recurring: 10,
			onFinished: x => console.log('foo:\n', x.body)
		}
	],

	pipe: [
		{
			name: 'test',
			data: '',
			initialRun: 8,
			pipeline: [
				'func_nodeinfo',
				'func_wordcount'
			],
			onFinished: x => console.log('Piped Function Wordcount:\n', x.body)
		},
	]
// gateway URL is optional and defaults to http://localhost:8080
// if one is not supplied
}, 'http://45.45.45.45:8080');

