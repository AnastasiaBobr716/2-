export interface IExercise {
  id: number;
  name: string;
  description: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface IExerciseCreateRequest {
  name: string;
  description: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
}

export interface IExerciseUpdateRequest extends Partial<IExerciseCreateRequest> {
  id: number;
}
