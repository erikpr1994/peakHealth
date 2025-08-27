import type { RoutineCreationData } from '../types';

export interface Routine {
  id: string;
  name: string;
  difficulty: string;
  goal: string;
  description: string;
  objectives: string[];
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoutineRequest {
  name: string;
  difficulty: string;
  goal: string;
  description: string;
  objectives: string[];
  duration: number;
  strengthWorkouts: any[];
  runningWorkouts: any[];
}

export interface UpdateRoutineRequest extends CreateRoutineRequest {
  id: string;
}

class MockRoutineService {
  private routines: Routine[] = [];

  async createRoutine(data: CreateRoutineRequest): Promise<Routine> {
    const routine: Routine = {
      id: `routine_${Date.now()}`,
      name: data.name,
      difficulty: data.difficulty,
      goal: data.goal,
      description: data.description,
      objectives: data.objectives,
      duration: data.duration,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.routines.push(routine);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return routine;
  }

  async updateRoutine(data: UpdateRoutineRequest): Promise<Routine> {
    const routineIndex = this.routines.findIndex(r => r.id === data.id);

    if (routineIndex === -1) {
      throw new Error('Routine not found');
    }

    const updatedRoutine: Routine = {
      ...this.routines[routineIndex],
      name: data.name,
      difficulty: data.difficulty,
      goal: data.goal,
      description: data.description,
      objectives: data.objectives,
      duration: data.duration,
      updatedAt: new Date(),
    };

    this.routines[routineIndex] = updatedRoutine;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return updatedRoutine;
  }

  async getRoutineById(id: string): Promise<Routine | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return this.routines.find(r => r.id === id) || null;
  }

  async getAllRoutines(): Promise<Routine[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [...this.routines];
  }

  async deleteRoutine(id: string): Promise<void> {
    const routineIndex = this.routines.findIndex(r => r.id === id);

    if (routineIndex === -1) {
      throw new Error('Routine not found');
    }

    this.routines.splice(routineIndex, 1);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

export const routineService = new MockRoutineService();
