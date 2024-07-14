import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getPackageVersion(): string {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return packageJson.version;
}
