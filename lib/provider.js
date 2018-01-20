'use babel';

import { EventEmitter } from 'events';
import { existsSync } from 'fs';
import { platform } from 'os';
import { join } from 'path';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

export const config = {
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

// This package depends on build, make sure it's installed
export function activate() {
  if (atom.config.get(meta.name + '.manageDependencies') === true) {
    this.satisfyDependencies();
  }
}

export function which() {
  if (platform() === 'win32') {
    return 'where';
  }
  return 'which';
}

export function satisfyDependencies() {
  let k;
  let v;

  require('atom-package-deps').install(meta.name);

  const ref = meta['package-deps'];
  const results = [];

  for (k in ref) {
    if (typeof ref !== 'undefined' && ref !== null) {
      v = ref[k];
      if (atom.packages.isPackageDisabled(v)) {
        if (atom.inDevMode()) {
          console.log('Enabling package \'' + v + '\'');
        }
        results.push(atom.packages.enablePackage(v));
      } else {
        results.push(void 0);
      }
    }
  }
  return results;
}

export function provideBuilder() {
  return class pynsistProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-pynsist.pathToPynsist', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Pynsist';
    }

    isEligible() {
      if (atom.config.get(meta.name + '.alwaysEligible') === true) {
        return true;
      }

      // First, check for installer.cfg
      const projectPath = atom.project.getPaths()[0];
      const projectConfig = (typeof projectPath !== 'undefined') ? existsSync(join(projectPath, 'installer.cfg')) : false;
      const activeEditor = atom.workspace.getActiveTextEditor();
      const activePath = (typeof activeEditor !== 'undefined') ? activeEditor.getPath() : false;
      const activeConfig = (activePath !== false) ? existsSync(join(activePath, 'installer.cfg')) : false;
      const hasConfig = (projectConfig || activeConfig) ? true : false;

      // Second, check for pynsist
      const pathToPynsist = atom.config.get(meta.name + '.pathToPynsist');
      const cmd = spawnSync(which(), [ pathToPynsist ]);
      const hasPynsist = (!cmd.stdout.toString()) ? false : true;

      if (hasPynsist === true && hasConfig === true) {
        return true;
      }

      // Warn only
      if (hasPynsist === false && atom.config.get(meta.name + '.mutePathWarning') === false) {
        const notification = atom.notifications.addWarning(`**${meta.name}**: No valid \`pynsist\` was specified in your settings`, {
          dismissable: true,
          buttons: [
            {
              text: 'Open Settings',
              className: 'icon icon-gear',
              onDidClick: function () {
                atom.workspace.open('atom://config/packages/' + meta.name, {pending: true, searchAllPanes: true});
                notification.dismiss();
              }
            },
            {
              text: 'Ignore',
              onDidClick: function () {
                atom.config.set(meta.name + '.mutePathWarning', true);
                notification.dismiss();
              }
            }
          ]
        });
      }

      return false;
    }

    settings() {
      const pathToPynsist = atom.config.get(meta.name + '.pathToPynsist');

      return [
        {
          name: 'Pynsist: Compile Installer',
          exec: pathToPynsist,
          args: ['{FILE_ACTIVE}'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b'
        },
        {
          name: 'Pynsist: Generate Script',
          exec: pathToPynsist,
          args: ['--no-makensis', '{FILE_ACTIVE}'],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b'
        }
      ];
    }
  };
}
