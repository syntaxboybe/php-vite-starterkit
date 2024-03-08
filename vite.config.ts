// vite.config.js
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import usePHP from 'vite-plugin-php';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default defineConfig(({ command }) => {
	const base = command === 'serve' ? '/pages/' : '/';
	const BASE = base.substring(0, base.length - 1);

	return {
		base,
		plugins: [
			usePHP({
				entry: ['pages/**/*.php', 'partials/**/*.php', 'php/**/*.php'],
			}),
			ViteEjsPlugin({
				BASE,
			}),
			viteStaticCopy({
				targets: [
					{ src: 'src/public', dest: '' },
					{ src: 'php', dest: '' },
				],
				silent: command === 'serve',
			}),
		],
		define: { BASE: JSON.stringify(BASE) },
		resolve: {
			alias: {
				'~/': fileURLToPath(new URL('./src/', import.meta.url)),
			},
		},
		publicDir: command === 'build' ? 'raw' : 'src/public',
		server: {
			port: 3000,
		},
	};
});
