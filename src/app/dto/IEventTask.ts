export interface IEventTask {
  id: number;
  event_id: number;
  responsible_id: number;
  task_name: string;
  description?: string;
  status: number; // 1: Pending, 2: In Progress, 3: Completed
  created_at: Date;
  updated_at: Date;
}
