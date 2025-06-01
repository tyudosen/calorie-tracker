import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/schemas/drizzle.ts',
	dialect: 'postgresql',
});

