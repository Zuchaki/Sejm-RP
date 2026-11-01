import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) => message.startsWith('chore: bump') || message.startsWith('Updating'), // Ignore dependabot commits
    (message) => message.startsWith('Merge branch '), // Ignore merge commits, e.g. "Merge branch 'main' into feature"
  ],
};

export default Configuration;
