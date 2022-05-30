import {
  pause,
  deleteTask,
  inquirerMenu,
  readInput,
  confirm,
  completeTasks,
} from './libs'
import { Task } from './models/task'
import 'colors'
import { printTasks, readDB, saveOnDB } from './helpers'

const main = async () => {
  let opt = ''
  let tasks: Task[] = readDB()

  do {
    opt = await inquirerMenu()
    switch (opt) {
      case '1':
        const description = await readInput('Type task description: ')
        const task = new Task(description)
        tasks.push(task)
        saveOnDB(tasks)
        break
      case '2':
        printTasks(tasks)
        break
      case '3':
        printTasks(
          tasks.filter(({ completedAt }) => completedAt !== null),
          true
        )
        break
      case '4':
        printTasks(tasks.filter(({ completedAt }) => completedAt === null))
        break
      case '5':
        const ids = await completeTasks(tasks)
        tasks = tasks.map((task) => {
          if (ids.includes(task.id)) {
            task.completedAt = new Date().toLocaleString()
          } else {
            task.completedAt = null
          }
          return task
        })
        saveOnDB(tasks)

        break
      case '6':
        const taskId = await deleteTask(tasks)
        if (taskId !== '0') {
          const ok = await confirm('Are you sure?')
          if (ok) {
            tasks = tasks.filter(({ id }) => id !== taskId)
            saveOnDB(tasks)
          }
        }
        break
    }

    await pause()
  } while (opt !== '0')
}

main()
