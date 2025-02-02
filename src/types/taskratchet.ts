export interface Task {
  id: string;
  title: string;
  deadline: string;
  stake: number;
  completed: boolean;
}

export interface TaskRatchetConfig {
  apiKey: string;
  apiUrl: string;
}
