import enquirer from 'enquirer';
import { execa } from 'execa';
import { types, scopes } from './config';

interface PromptObject {
  types: string;
  scopes: string;
  description: string;
}

export async function gitCommit() {
  const result = await enquirer.prompt<PromptObject>([
    {
      name: 'types',
      type: 'select',
      message: '请选择提交的类型',
      choices: types.map(item => ({ name: item.value, message: item.title }))
    },
    {
      name: 'scopes',
      type: 'select',
      message: '选择一个scope',
      choices: scopes.map(item => ({ name: item.value, message: item.title }))
    },
    {
      name: 'description',
      type: 'text',
      message: '请输入提交描述'
    }
  ]);

  const commitMsg = `${result.types}(${result.scopes}): ${result.description}`;

  execa('git', ['commit', '-m', commitMsg], { stdio: 'inherit' });
}
