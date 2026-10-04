import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

const probe = createServer().listen(0, '127.0.0.1');
await once(probe, 'listening');
const address = probe.address();
assert(address && typeof address !== 'string');
await new Promise<void>((resolve) => probe.close(() => resolve()));

const origin = 'https://runtime.example';
const base = `http://127.0.0.1:${address.port}`;
const headers = { 'x-forwarded-proto': 'https', 'x-forwarded-host': 'runtime.example' };
const server = spawn(process.execPath, ['build/index.js'], {
	env: {
		...process.env,
		HOST: '127.0.0.1',
		PORT: String(address.port),
		NODE_ENV: 'production',
		PUBLIC_BASE_URL: origin,
		PUBLIC_SITE_NAME: 'Runtime smoke',
		PROTOCOL_HEADER: 'x-forwarded-proto',
		HOST_HEADER: 'x-forwarded-host'
	},
	stdio: ['ignore', 'pipe', 'pipe']
});
let logs = '';
server.stdout.on('data', (chunk) => (logs += chunk));
server.stderr.on('data', (chunk) => (logs += chunk));

try {
	let response: Response | undefined;
	for (let attempt = 0; attempt < 100; attempt++) {
		assert.equal(server.exitCode, null, logs);
		try {
			response = await fetch(base, { headers, signal: AbortSignal.timeout(1000) });
			break;
		} catch {
			await delay(100);
		}
	}
	assert(response?.ok, `Production server did not start: ${logs}`);
	const html = await response.text();
	assert(html.includes('Runtime smoke') && html.includes(origin));
	const csp = response.headers.get('content-security-policy') ?? '';
	for (const directive of ["default-src 'self'", "object-src 'none'", "'nonce-"]) {
		assert(csp.includes(directive), csp);
	}
	assert.equal(response.headers.get('x-frame-options'), 'DENY');
	assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
	for (const [path, expected] of [
		['/sitemap.xml', origin],
		['/robots.txt', `${origin}/sitemap.xml`],
		['/manifest.webmanifest', 'Runtime smoke']
	]) {
		const result = await fetch(base + path, { headers });
		assert(result.ok && (await result.text()).includes(expected), path);
	}
	for (const [requestOrigin, status] of [
		['https://evil.example', 403],
		[origin, 405]
	] as const) {
		const result = await fetch(base, {
			method: 'POST',
			headers: {
				...headers,
				Origin: requestOrigin,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'smoke=1'
		});
		assert.equal(result.status, status, requestOrigin);
	}
	console.log('Production smoke passed: runtime env, metadata, CSP and proxy-origin CSRF checks');
} finally {
	if (server.exitCode === null && server.signalCode === null) {
		const exited = once(server, 'exit');
		server.kill();
		const timer = setTimeout(() => server.kill('SIGKILL'), 5000);
		await exited;
		clearTimeout(timer);
	}
}
