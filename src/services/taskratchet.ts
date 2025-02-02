import { Task, TaskRatchetConfig } from '../types/taskratchet';

export class TaskRatchetService {
  constructor(_config: TaskRatchetConfig) {}

  async getTasks(): Promise<Task[]> {
    // TODO: Implement TaskRatchet API integration
    return [];
  }

  async createTask(_title: string, _deadline: string, _stake: number): Promise<Task> {
    // TODO: Implement TaskRatchet API integration
    throw new Error('Not implemented');
  }
}
