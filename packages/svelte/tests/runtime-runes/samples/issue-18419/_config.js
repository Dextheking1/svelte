import { flushSync } from 'svelte';
import { test } from '../../test';

export default test({
	test({ assert, target }) {
		const warnings = [];
		const orig = console.warn;
		console.warn = (...args) => {
			warnings.push(args.join(' '));
		};

		const [tick, add] = target.querySelectorAll('button');
		const texts = () => [...target.querySelectorAll('p')].map((p) => p.textContent);

		try {
			flushSync(() => add.click());
			flushSync(() => add.click());
			flushSync(() => add.click());
			flushSync(() => tick.click());
			assert.deepEqual(texts(), ['1s', '1s', '1s']);

			// adding a fourth item removes the first row
			flushSync(() => add.click());
			flushSync(() => tick.click());

			// every remaining row must still react to the clock
			assert.deepEqual(texts(), ['2s', '2s', '2s']);
		} finally {
			console.warn = orig;
		}

		assert.deepEqual(
			warnings.filter((w) => w.includes('derived_inert')),
			[]
		);
	}
});
