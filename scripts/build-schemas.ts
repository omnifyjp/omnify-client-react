#!/usr/bin/env tsx
/**
 * Build script to generate TypeScript types from SSO schemas
 * 
 * This script:
 * 1. Copies SSO schemas from omnify-client-laravel-sso
 * 2. Generates TypeScript types using omnify-typescript
 * 3. Outputs to src/schemas/ for bundling
 */

import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = resolve(__dirname, '..');

// Paths
const ssoSchemasSource = resolve(packageRoot, '../omnify-client-laravel-sso/database/schemas/Sso');
const schemasTarget = resolve(packageRoot, 'schemas');
const typesOutput = resolve(packageRoot, 'src/schemas');

async function main() {
  console.log('🔧 Building SSO schema types...');

  // 1. Clean previous builds
  if (existsSync(schemasTarget)) {
    rmSync(schemasTarget, { recursive: true });
  }
  if (existsSync(typesOutput)) {
    rmSync(typesOutput, { recursive: true });
  }

  // 2. Copy SSO schemas
  if (!existsSync(ssoSchemasSource)) {
    console.error('❌ SSO schemas not found at:', ssoSchemasSource);
    process.exit(1);
  }

  mkdirSync(schemasTarget, { recursive: true });
  cpSync(ssoSchemasSource, schemasTarget, { recursive: true });
  console.log('✅ Copied SSO schemas');

  // 3. Generate TypeScript types
  const { loadSchemas } = await import('@famgia/omnify-core');
  const { generateTypeScript } = await import('@famgia/omnify-typescript');

  const schemas = await loadSchemas(schemasTarget);
  console.log(`📦 Loaded ${Object.keys(schemas).length} schemas`);

  const files = generateTypeScript(schemas, {
    generateZodSchemas: true,
    multiLocale: true,
  });

  // 4. Write output files
  mkdirSync(typesOutput, { recursive: true });
  mkdirSync(resolve(typesOutput, 'base'), { recursive: true });

  const { writeFileSync } = await import('fs');

  for (const file of files) {
    let outputPath: string;

    if (file.category === 'enum') {
      // Enums go to schemas/enum/
      outputPath = resolve(typesOutput, 'enum', file.filePath);
    } else if (file.filePath.startsWith('base/')) {
      // Base files stay in base/
      outputPath = resolve(typesOutput, file.filePath);
    } else {
      // Model files go to root
      outputPath = resolve(typesOutput, file.filePath);
    }

    const dir = dirname(outputPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(outputPath, file.content);
    console.log(`  📄 ${file.filePath}`);
  }

  console.log(`✅ Generated ${files.length} TypeScript files`);

  // 5. Clean up copied schemas (not needed in published package)
  rmSync(schemasTarget, { recursive: true });
  console.log('🧹 Cleaned up temporary schemas');

  console.log('✨ Done!');
}

main().catch(console.error);
