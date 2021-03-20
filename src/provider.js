import meta from '../package.json';
import { configSchema, getConfig } from './config';
import { EventEmitter } from 'events';
import { existsSync } from 'fs';
import { join } from 'path';
import { satisfyDependencies } from 'atom-satisfy-dependencies';
import { spawnSync } from 'child_process';
import { which } from './util';

export { configSchema as config };

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

    async isEligible() {
      if (getConfig('alwaysEligible') === true) {
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
      const pathToPynsist = getConfig('pathToPynsist');
      const whichCmd = spawnSync(which(), [ pathToPynsist ]);
      const hasPynsist = (!whichCmd.stdout.toString()) ? false : true;

      if (hasPynsist === true && hasConfig === true) {
        return true;
      }

      // Warn only
      if (hasPynsist === false && getConfig('mutePathWarning') === false) {
        const notification = atom.notifications.addWarning(`**${meta.name}**: No valid \`pynsist\` was specified in your settings`, {
          dismissable: true,
          buttons: [
            {
              text: 'Open Settings',
              className: 'icon icon-gear',
              onDidClick: function () {
                atom.workspace.open(`atom://config/packages/${meta.name}`, {pending: true, searchAllPanes: true});
                notification.dismiss();
              }
            },
            {
              text: 'Ignore',
              onDidClick: function () {
                atom.config.set(`${meta.name}.mutePathWarning`, true);
                notification.dismiss();
              }
            }
          ]
        });
      }

      return false;
    }

    settings() {
      const pathToPynsist = getConfig('pathToPynsist');

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

// This package depends on build, make sure it's installed
export async function activate() {
  if (getConfig('manageDependencies') === true) {
    satisfyDependencies(meta.name);
  }
}
