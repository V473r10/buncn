import * as p from "@clack/prompts";
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectConfig {
  name: string;
  description: string;
  author: string;
  repository: string;
  useTypeScript: boolean;
  packageManager: 'bun' | 'npm' | 'yarn' | 'pnpm';
}

async function main() {
  console.clear();
  
  p.intro('🚀 Welcome to Buncn - A Modern Bun Monorepo Starter');

  try {
    const config = await getProjectConfig();
    const projectDir = path.resolve(process.cwd(), config.name);

    await createProjectStructure(projectDir, config);
    await installDependencies(projectDir, config);
    await initializeGit(projectDir);

    p.outro('🎉 Project created successfully!');
    console.log('\nNext steps:');
    console.log(`  cd ${config.name}`);
    console.log(`  ${config.packageManager} run dev\n`);
  } catch (error) {
    p.cancel(error instanceof Error ? error.message : 'Operation cancelled');
    process.exit(1);
  }
}

async function getProjectConfig(): Promise<ProjectConfig> {
  const config = await p.group(
    {
      name: () =>
        p.text({
          message: 'Project name:',
          placeholder: 'my-buncn-app',
          validate: (value) => {
            if (!value) return 'Project name is required';
            if (!/^[a-z0-9-]+$/.test(value)) {
              return 'Project name must be lowercase with hyphens';
            }
          },
        }),
      description: () =>
        p.text({
          message: 'Project description:',
          placeholder: 'My awesome Buncn project',
        }),
      author: () =>
        p.text({
          message: 'Author:',
          placeholder: 'Your Name <email@example.com>',
        }),
      repository: () =>
        p.text({
          message: 'Repository URL (optional):',
          placeholder: 'https://github.com/username/repo',
        }),
      useTypeScript: () =>
        p.confirm({
          message: 'Use TypeScript?',
          initialValue: true,
        }),
      packageManager: () =>
        p.select({
          message: 'Package manager:',
          options: [
            { value: 'bun', label: 'Bun' },
            { value: 'npm', label: 'npm' },
            { value: 'yarn', label: 'Yarn' },
            { value: 'pnpm', label: 'pnpm' },
          ],
          initialValue: 'bun' as const,
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled');
        process.exit(0);
      },
    },
  );

  return config as ProjectConfig;
}

async function createProjectStructure(projectDir: string, config: ProjectConfig) {
  const spinner = p.spinner();
  spinner.start('Creating project structure');

  try {
    // Create project directory
    await fs.mkdir(projectDir, { recursive: true });

    // Copy template files (excluding create-buncn directory)
    const templateDir = path.join(__dirname, '../../');
    const excludeDirs = ['node_modules', '.git', 'packages/create-buncn', 'dist'];
    
    await copyDir(templateDir, projectDir, excludeDirs, config);

    // Update package.json with project info
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    
    packageJson.name = config.name;
    packageJson.description = config.description || '';
    packageJson.author = config.author || '';
    packageJson.repository = config.repository ? { type: 'git', url: config.repository } : undefined;
    
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n',
      'utf-8'
    );

    spinner.stop('Project structure created');
  } catch (error) {
    spinner.stop('Failed to create project structure');
    throw error;
  }
}

async function copyDir(
  src: string,
  dest: string,
  excludeDirs: string[],
  config: ProjectConfig,
  relativePath = ''
) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    const relativeEntryPath = path.join(relativePath, entry.name);

    // Skip excluded directories
    if (excludeDirs.some(dir => relativeEntryPath.startsWith(dir))) {
      continue;
    }

    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyDir(srcPath, destPath, excludeDirs, config, relativeEntryPath);
    } else {
      // Process file content for template variables
      let content = await fs.readFile(srcPath, 'utf-8');
      
      // Replace template variables
      content = content
        .replace(/{{project-name}}/g, config.name)
        .replace(/{{description}}/g, config.description || '')
        .replace(/{{author}}/g, config.author || '');
      
      await fs.writeFile(destPath, content, 'utf-8');
    }
  }
}

async function installDependencies(projectDir: string, config: ProjectConfig) {
  const spinner = p.spinner();
  spinner.start('Installing dependencies');

  try {
    // Remove create-buncn from workspaces if it exists
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    
    if (packageJson.workspaces) {
      packageJson.workspaces = packageJson.workspaces.filter(
        (ws: string) => ws !== 'packages/create-buncn'
      );
      
      if (packageJson.workspaces.length === 0) {
        delete packageJson.workspaces;
      }
      
      await fs.writeFile(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n',
        'utf-8'
      );
    }

    // Install dependencies
    const installCmd = {
      bun: 'bun install',
      npm: 'npm install',
      yarn: 'yarn',
      pnpm: 'pnpm install',
    }[config.packageManager];

    await execAsync(installCmd, { cwd: projectDir });
    spinner.stop('Dependencies installed');
  } catch (error) {
    spinner.stop('Failed to install dependencies');
    throw error;
  }
}

async function initializeGit(projectDir: string) {
  const spinner = p.spinner();
  spinner.start('Initializing Git repository');

  try {
    await execAsync('git init', { cwd: projectDir });
    await execAsync('git add .', { cwd: projectDir });
    await execAsync('git commit -m "Initial commit"', { cwd: projectDir });
    spinner.stop('Git repository initialized');
  } catch (error) {
    spinner.stop('Failed to initialize Git repository');
    // Not critical, so we don't throw
    console.warn('  - Git initialization failed, continuing...');
  }
}

main().catch(console.error);