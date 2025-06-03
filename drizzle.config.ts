import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './src/schemas/drizzle',
	schema: './src/schemas/drizzle.ts',
	dialect: 'postgresql',
});

