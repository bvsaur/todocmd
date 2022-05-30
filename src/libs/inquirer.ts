import inquirer from 'inquirer'
import 'colors'
import { Task } from '../models/task'

export const inquirerMenu = async (): Promise<string> => {
  const questions: inquirer.QuestionCollection<inquirer.Answers> = [
    {
      type: 'list',
      name: 'option',
      message: '¿What do you wanna do?',
      choices: [
        {
          value: '1',
          name: `${'1.'.blue} Create task`,
        },
        {
          value: '2',
          name: `${'2.'.blue} List tasks`,
        },
        {
          value: '3',
          name: `${'3.'.blue} List completed tasks`,
        },
        {
          value: '4',
          name: `${'4.'.blue} List pending tasks`,
        },
        {
          value: '5',
          name: `${'5.'.blue} Complete task(s)`,
        },
        {
          value: '6',
          name: `${'6.'.blue} Delete task`,
        },
        {
          value: '0',
          name: `${'0.'.blue} Exit`,
        },
      ],
    },
  ]

  console.clear()
  console.log('============================'.green)
  console.log('Select an option ...'.white)
  console.log('============================\n'.green)

  const { option } = await inquirer.prompt(questions)

  return option
}

export const readInput = async (message: string) => {
  const question: inquirer.QuestionCollection<inquirer.Answers> = [
    {
      type: 'input',
      name: 'input',
      message,
      validate(value) {
        if (!value) return 'Please enter a value.'
        return true
      },
    },
  ]

  const { input } = await inquirer.prompt(question)
  return input
}

export const deleteTask = async (tasks: Task[]): Promise<string> => {
  const choices = tasks.map(({ id, description }, idx) => ({
    value: id,
    name: `${idx + 1}.`.green + ` ${description}`,
  }))

  choices.unshift({ value: '0', name: '0.'.green + ' Cancel' })

  const options: inquirer.QuestionCollection<inquirer.Answers> = {
    type: 'list',
    name: 'taskId',
    message: 'Select the task to delete:',
    choices,
  }

  const { taskId } = await inquirer.prompt(options)
  return taskId
}

export const completeTasks = async (tasks: Task[]): Promise<string[]> => {
  const choices = tasks.map(({ id, description, completedAt }) => ({
    value: id,
    name: description,
    checked: completedAt && true,
  }))

  const options: inquirer.QuestionCollection<inquirer.Answers> = {
    type: 'checkbox',
    name: 'ids',
    message: 'Select tasks to complete:',
    choices,
  }

  const { ids } = await inquirer.prompt(options)
  return ids
}

export const pause = async () => {
  console.log('\n')
  const { input } = await inquirer.prompt({
    type: 'input',
    name: 'input',
    message: `Press ${'Enter'.green} to continue`,
  })

  return input
}

export const confirm = async (message: string): Promise<boolean> => {
  const options: inquirer.QuestionCollection<inquirer.Answers> = {
    type: 'confirm',
    name: 'ok',
    message,
  }
  const { ok } = await inquirer.prompt(options)
  return ok
}
