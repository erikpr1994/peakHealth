import { Page as PlaywrightPage } from '@playwright/test';
import { RegularUserBasePage } from './RegularUserBasePage';

/**
 * Page object for the routine creation page
 */
export class RoutineCreatePage extends RegularUserBasePage {
  // Selectors for form elements
  private readonly routineNameSelector =
    'input[placeholder*="enter routine name" i]';
  private readonly routineDescriptionSelector =
    'textarea[placeholder*="describe your routine" i]';
  private readonly difficultyDropdownSelector =
    'div[role="combobox"]:has-text("Beginner")';
  private readonly typeDropdownSelector =
    'div[role="combobox"]:has-text("Strength")';
  private readonly goalsInputSelector =
    'input[placeholder*="what are the main goals" i]';
  private readonly saveRoutineButtonSelector =
    'button:has-text("Save Routine")';
  private readonly addStrengthWorkoutButtonSelector =
    'button:has-text("Add Strength Workout")';
  private readonly workoutNameSelector =
    'input[placeholder*="workout name" i], input:not([placeholder]):first-of-type';
  // Routine-level objectives (general training objectives)
  private readonly routineObjectivesSelector =
    'input[placeholder*="main goals and focus areas" i], input[placeholder*="training objectives" i], input[placeholder*="objectives" i]';

  // Workout-level objective (specific workout goal)
  private readonly workoutObjectiveSelector =
    'textarea[placeholder*="primary goal" i], textarea[placeholder*="objective" i], textarea[aria-label*="objective" i]';
  private readonly addSectionButtonSelector = 'button:has-text("Add Section")';
  private readonly sectionNameSelector =
    'input[id="section-name"], input[placeholder*="section name" i]';
  private readonly addExerciseButtonSelector =
    'button:has-text("Add Exercise")';
  private readonly exerciseDialogSelector = '[role="dialog"]';
  private readonly exerciseListSelector =
    '[role="dialog"] ul, [role="dialog"] div[role="list"]';
  private readonly exerciseItemSelector =
    '[role="dialog"] li, [role="dialog"] div[role="listitem"]';
  private readonly confirmAddExerciseButtonSelector =
    '[role="dialog"] button:has-text("Add Exercise")';
  private readonly exerciseHeadingSelector =
    'h3.font-semibold.text-gray-900.text-lg, h4.font-semibold.text-gray-900.text-lg';
  private readonly exerciseInputsSelector =
    'input[type="text"], input:not([type])';

  /**
   * Constructor for the RoutineCreatePage
   * @param page - The Playwright page object
   */
  constructor(page: PlaywrightPage) {
    super(page, '/routines/create');
  }

  /**
   * Fill the routine name field
   * @param name - The name to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillRoutineName(name: string): Promise<void> {
    await this.fillField(this.routineNameSelector, name);
  }

  /**
   * Fill the routine description field
   * @param description - The description to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillRoutineDescription(description: string): Promise<void> {
    await this.fillField(this.routineDescriptionSelector, description);
  }

  /**
   * Select a difficulty level
   * @param difficulty - The difficulty to select (e.g., 'Beginner', 'Intermediate', 'Advanced')
   * @returns Promise that resolves when the difficulty is selected
   */
  async selectDifficulty(difficulty: string): Promise<void> {
    // Find the difficulty dropdown by label
    const difficultyTrigger = this.page
      .locator('button[role="combobox"]')
      .filter({ hasText: 'Beginner' });
    await difficultyTrigger.waitFor({ state: 'visible', timeout: 10000 });
    await difficultyTrigger.click();

    // Select the difficulty option
    const option = this.page.locator(
      `[role="option"]:has-text("${difficulty}")`
    );
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  /**
   * Select a routine type
   * @param type - The type to select (e.g., 'Strength', 'Hypertrophy', 'Endurance', 'Weight Loss')
   * @returns Promise that resolves when the type is selected
   */
  async selectType(type: string): Promise<void> {
    // Find the type dropdown by label
    const typeTrigger = this.page
      .locator('button[role="combobox"]')
      .filter({ hasText: 'Strength' });
    await typeTrigger.waitFor({ state: 'visible', timeout: 10000 });
    await typeTrigger.click();

    // Select the type option
    const option = this.page.locator(`[role="option"]:has-text("${type}")`);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  /**
   * Add a goal to the routine
   * @param goal - The goal to add
   * @returns Promise that resolves when the goal is added
   */
  async addGoal(goal: string): Promise<void> {
    await this.fillField(this.goalsInputSelector, goal);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Click the Add Strength Workout button
   * @returns Promise that resolves when the button is clicked
   */
  async clickAddStrengthWorkout(): Promise<void> {
    const button = this.page.locator(this.addStrengthWorkoutButtonSelector);
    await button.waitFor({ state: 'visible', timeout: 10000 });
    await button.click();
  }

  /**
   * Fill the workout name field
   * @param name - The name to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillWorkoutName(name: string): Promise<void> {
    // Find the first empty text input field
    const inputs = this.page.locator(this.workoutNameSelector);
    await inputs.first().fill(name);
  }

  /**
   * Fill the routine-level training objectives
   * @param objectives - Array of objectives to add
   * @returns Promise that resolves when the objectives are filled
   */
  async fillRoutineObjectives(objectives: string[]): Promise<void> {
    const objectivesField = this.page
      .locator(this.routineObjectivesSelector)
      .first();

    for (const objective of objectives) {
      await objectivesField.fill(objective);
      await objectivesField.press('Enter');
    }
  }

  /**
   * Fill the workout-level objective field
   * @param objective - The objective to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillWorkoutObjective(objective: string): Promise<void> {
    const objectiveField = this.page
      .locator(this.workoutObjectiveSelector)
      .first();

    await objectiveField.fill(objective);
    await objectiveField.press('Enter');
  }

  /**
   * Click the Add Section button
   * @returns Promise that resolves when the button is clicked
   */
  async clickAddSection(): Promise<void> {
    await this.page.locator(this.addSectionButtonSelector).first().click();
  }

  /**
   * Fill the section name field
   * @param name - The name to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillSectionName(name: string): Promise<void> {
    await this.page.locator(this.sectionNameSelector).first().fill(name);
  }

  /**
   * Click the Add Exercise button
   * @returns Promise that resolves when the button is clicked
   */
  async clickAddExercise(): Promise<void> {
    await this.page.locator(this.addExerciseButtonSelector).first().click();
    await this.page.waitForSelector(this.exerciseDialogSelector);
  }

  /**
   * Select an exercise from the dialog
   * @param exerciseName - The name of the exercise to select
   * @returns Promise that resolves when the exercise is selected
   */
  async selectExercise(exerciseName: string): Promise<void> {
    await this.page.getByText(new RegExp(exerciseName, 'i')).first().click();
    await this.page.locator(this.confirmAddExerciseButtonSelector).click();

    // Wait for the exercise to be added to the form
    await this.page
      .locator(this.exerciseHeadingSelector)
      .filter({ hasText: new RegExp(exerciseName, 'i') })
      .waitFor({ state: 'visible' });
  }

  /**
   * Fill exercise details (sets, reps, weight)
   * @param setIndex - The index of the set (0-based)
   * @param reps - The number of reps
   * @param weight - The weight
   * @returns Promise that resolves when the fields are filled
   */
  async fillExerciseDetails(
    setIndex: number,
    reps: string,
    weight: string
  ): Promise<void> {
    const inputs = this.page
      .locator(this.exerciseInputsSelector)
      .filter({ hasText: '' });

    // Calculate the input indices based on the set index
    // Each set has 2 inputs (reps and weight)
    const repsInputIndex = setIndex * 2;
    const weightInputIndex = setIndex * 2 + 1;

    await inputs.nth(repsInputIndex).fill(reps);
    await inputs.nth(weightInputIndex).fill(weight);
  }

  /**
   * Click the Save Routine button
   * @returns Promise that resolves when the button is clicked
   */
  async clickSaveRoutine(): Promise<void> {
    await this.click(this.saveRoutineButtonSelector);
  }

  /**
   * Create a complete routine with all required fields
   * @param routineData - The data for the routine
   * @returns Promise that resolves when the routine is created
   */
  async createCompleteRoutine(routineData: {
    name: string;
    description: string;
    difficulty: string;
    type: string;
    goals: string[];
    workout: {
      name: string;
      objective: string;
      section: {
        name: string;
        exercise: {
          name: string;
          sets: Array<{ reps: string; weight: string }>;
        };
      };
    };
  }): Promise<void> {
    // Fill basic routine info
    await this.fillRoutineName(routineData.name);
    await this.fillRoutineDescription(routineData.description);
    await this.selectDifficulty(routineData.difficulty);
    await this.selectType(routineData.type);

    // Add routine-level objectives
    await this.fillRoutineObjectives(routineData.goals);

    // Add workout
    await this.clickAddStrengthWorkout();
    await this.fillWorkoutName(routineData.workout.name);
    await this.fillWorkoutObjective(routineData.workout.objective);

    // Add section
    await this.clickAddSection();
    await this.fillSectionName(routineData.workout.section.name);

    // Add exercise
    await this.clickAddExercise();
    await this.selectExercise(routineData.workout.section.exercise.name);

    // Fill exercise details
    for (let i = 0; i < routineData.workout.section.exercise.sets.length; i++) {
      const set = routineData.workout.section.exercise.sets[i];
      await this.fillExerciseDetails(i, set.reps, set.weight);
    }

    // Save the routine
    await this.clickSaveRoutine();
  }

  /**
   * Take a screenshot of the routine creation page
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(): Promise<void> {
    await super.takeScreenshot('routine-create', {
      fullPage: true,
      animations: 'disabled',
    });
  }
}
