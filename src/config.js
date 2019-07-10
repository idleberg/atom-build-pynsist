import meta from '../package.json';

export const configSchema = {
  pathToPynsist: {
    title: 'Path to Pynsist',
    description: 'Specify the full path to `pynsist`',
    type: 'string',
    default: 'pynsist',
    order: 0
  },
  mutePathWarning: {
    title: 'Mute Warning',
    description: 'When enabled, warnings about missing path to `pynsist` will be muted',
    type: 'boolean',
    default: false,
    order: 1
  },
  manageDependencies: {
    title: 'Manage Dependencies',
    description: 'When enabled, third-party dependencies will be installed automatically',
    type: 'boolean',
    default: true,
    order: 3
  },
  alwaysEligible: {
    title: 'Always Eligible',
    description: 'The build provider will be available in your project, even when not eligible',
    type: 'boolean',
    default: false,
    order: 4
  }
};

export function getConfig(key) {
  return atom.config.get(`${meta.name}.${key}`);
}
