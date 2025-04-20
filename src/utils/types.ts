export interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
