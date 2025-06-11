import starlight from '@astrojs/starlight';
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Buncn',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/v473r10/buncn' }],
			sidebar: [
				{
					label: 'Getting started',
					items: [
						{
							label: 'Start building',
							link: '/getting-started/start-building',
						},
						{
							label: 'Authentication',
							link: '/getting-started/authentication',
						},
						{
							label: 'Project structure',
							link: '/getting-started/project-structure',
						},
					]
				},
				{
					label: 'Apps',
					items: [
						{
							label: 'API',
							items: [
								{
									label: 'About',
									link: '/apps/api/about',
								},
								{
									label: 'Routers',
									link: '/apps/api/routers',
								},
								{
									label: 'Auth',
									link: '/apps/api/auth',
								},
								{
									label: 'Schema',
									link: '/apps/api/schema',
								},
							],
						},
						{
							label: 'UI',
							link: '/guides/apps/ui',
						},
					],
				}
			],
		}),
	],
});
