import * as fs from 'fs';
import * as path from 'path';

import { TaskType } from '../../src/client/interfaces';
import { getTasksFromPayload } from '../../src/client/payload-tasks';

function getFixturePayload(fixture: string) {
  const filename = path.resolve(__dirname, 'fixtures', fixture);
  return JSON.parse(fs.readFileSync(filename).toString());
}

function getTasks(fixture: string) {
  return getTasksFromPayload(getFixturePayload(fixture));
}

describe('planner', () => {
  describe('generates bisect tasks', () => {
    const expectedBisectTask = {
      bisect: {
        badVersion: '12.0.0',
        gistId: '8c5fc0c6a5153d49b5a4a56d3ed9da8f',
        goodVersion: '11.0.0',
      },
      type: TaskType.bisect,
    };

    function expectBisectTask(fixture: string) {
      const tasks = getTasks(fixture);
      expect(tasks).toEqual(expect.arrayContaining([expectedBisectTask]));
    }

    it('from labels', () => {
      expectBisectTask('payload-new-label-bisect-needed.json');
    });

    it('from new issues', () => {
      expectBisectTask('payload-new-issue-opened.json');
    });
  });
});