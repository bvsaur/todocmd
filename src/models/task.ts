import { v4 as uuidv4 } from 'uuid'

export class Task {
  id: string
  description: string
  completedAt: string | null

  constructor(description: string) {
    this.id = uuidv4()
    this.description = description
    this.completedAt = null
  }
}
