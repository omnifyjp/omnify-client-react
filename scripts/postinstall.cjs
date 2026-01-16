/**
 * @famgia/omnify-react postinstall script
 *
 * This script runs after npm install to:
 * 1. Check if we're in a project with omnify.config.ts
 * 2. Run `npx omnify generate` to generate TypeScript types
 *
 * The generated types are placed in node_modules/.omnify/
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Skip in CI environments unless explicitly enabled
if (process.env.CI && !process.env.OMNIFY_GENERATE_IN_CI) {
  console.log('[@famgia/omnify-react] Skipping postinstall in CI environment');
  process.exit(0);
}

// Skip if OMNIFY_SKIP_POSTINSTALL is set
if (process.env.OMNIFY_SKIP_POSTINSTALL) {
  console.log('[@famgia/omnify-react] Skipping postinstall (OMNIFY_SKIP_POSTINSTALL is set)');
  process.exit(0);
}

/**
 * Find project root by looking for omnify.config.ts or omnify.config.js
 */
function findProjectRoot(startDir) {
  let dir = startDir;
  const root = path.parse(dir).root;

  while (dir !== root) {
    // Check for omnify config files
    const tsConfig = path.join(dir, 'omnify.config.ts');
    const jsConfig = path.join(dir, 'omnify.config.js');

    if (fs.existsSync(tsConfig) || fs.existsSync(jsConfig)) {
      return dir;
    }

    // Also check for package.json with omnify dependency (fallback)
    const pkgPath = path.join(dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        const deps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
        };
        if (deps['@famgia/omnify'] || deps['omnify']) {
          return dir;
        }
      } catch {
        // Ignore JSON parse errors
      }
    }

    dir = path.dirname(dir);
  }

  return null;
}

/**
 * Check if omnify CLI is available
 */
function isOmnifyAvailable(projectRoot) {
  try {
    const pkgPath = path.join(projectRoot, 'package.json');
    if (!fs.existsSync(pkgPath)) return false;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    return !!(deps['@famgia/omnify'] || deps['omnify']);
  } catch {
    return false;
  }
}

// Main execution
try {
  // Start from current working directory
  const startDir = process.cwd();
  const projectRoot = findProjectRoot(startDir);

  if (!projectRoot) {
    // Not in an omnify project, skip silently
    process.exit(0);
  }

  // Check if omnify is available
  if (!isOmnifyAvailable(projectRoot)) {
    console.log('[@famgia/omnify-react] @famgia/omnify not found, skipping generation');
    process.exit(0);
  }

  console.log('[@famgia/omnify-react] Running omnify generate...');

  // Run omnify generate
  execSync('npx omnify generate', {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      // Prevent infinite recursion
      OMNIFY_SKIP_POSTINSTALL: '1',
    },
  });

  console.log('[@famgia/omnify-react] Generation complete');
} catch (error) {
  // Don't fail the install if generation fails
  console.warn('[@famgia/omnify-react] Warning: Generation failed:', error.message);
  process.exit(0);
}
