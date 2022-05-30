import fs from 'fs'
import { Task } from '../models/task'

const dbFile = 'src/db/tasks.json'

export const saveOnDB = (data: Task[]) => {
  fs.writeFileSync(dbFile, JSON.stringify(data))
}

export const readDB = (): Task[] => {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]))
  }
  const jsonDB = fs.readFileSync(dbFile, { encoding: 'utf-8' })
  return JSON.parse(jsonDB)
}

export const printTasks = (tasks: Task[], completedList = false) => {
  console.log('\n')
  if (!tasks.length) {
    console.log(`\n${'There are no tasks to list.'.red}`)
    return
  }

  tasks.forEach(({ description, completedAt }, idx) => {
    console.log(
      `${idx + 1}.`.blue,
      description,
      completedList
        ? ':: '.white + `${completedAt}`.green
        : `:: ${completedAt ? 'Completed'.green : 'Pending'.red}`
    )
  })
}
