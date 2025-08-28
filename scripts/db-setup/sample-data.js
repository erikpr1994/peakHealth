// Sample data creation for MongoDB Routines database
async function createSampleDocuments(db) {
  console.log('Creating sample documents...');
  
  // Sample section document
  const sectionResult = await db.collection('sections').insertOne({
    name: 'Sample Warmup',
    type: 'warmup',
    notes: 'A basic warmup routine',
    restAfter: '00:01:00',
    exercises: [
      {
        name: 'Jumping Jacks',
        sets: 1,
        reps: 20,
        weight: null,
        notes: 'Moderate pace'
      }
    ],
    schemaVersion: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'sample-user-id',
    isPublic: true,
    tags: ['warmup', 'beginner'],
    parentSectionId: null,
    version: 1,
    isLatest: true,
    isArchived: false
  });
  console.log(`Inserted sample section with ID: ${sectionResult.insertedId}`);
  
  // Sample workout document
  const workoutResult = await db.collection('workouts').insertOne({
    name: 'Sample Full Body Workout',
    type: 'strength',
    objective: 'Build overall strength',
    notes: 'A basic full body workout',
    sections: [
      // Reference to the section we just created
      sectionResult.insertedId,
      // Embedded section
      {
        name: 'Main Workout',
        type: 'basic',
        notes: 'Focus on form',
        restAfter: '00:02:00',
        exercises: [
          {
            name: 'Squats',
            sets: 3,
            reps: 10,
            weight: null,
            notes: 'Bodyweight'
          }
        ]
      }
    ],
    schemaVersion: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'sample-user-id',
    isPublic: true,
    tags: ['strength', 'beginner'],
    parentWorkoutId: null,
    version: 1,
    isLatest: true,
    isArchived: false
  });
  console.log(`Inserted sample workout with ID: ${workoutResult.insertedId}`);
  
  // Sample routine document
  const routineResult = await db.collection('routines').insertOne({
    name: 'Sample Beginner Routine',
    description: 'A routine for beginners',
    difficulty: 'beginner',
    goal: 'strength',
    duration: 4, // 4 weeks
    objectives: ['Build strength', 'Improve form'],
    workouts: [
      // Reference to the workout we just created
      workoutResult.insertedId
    ],
    schemaVersion: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    routineType: 'template',
    templateType: 'trainer',
    createdBy: 'sample-user-id',
    allowCopy: true,
    isPublic: true,
    tags: ['beginner', 'strength'],
    targetAudience: ['beginners'],
    parentRoutineId: null,
    version: 1,
    isLatest: true
  });
  console.log(`Inserted sample routine with ID: ${routineResult.insertedId}`);
  
  // Sample routine assignment document
  const assignmentResult = await db.collection('routine_assignments').insertOne({
    routineVersionId: routineResult.insertedId,
    parentRoutineId: null,
    trainerId: 'sample-trainer-id',
    userId: 'sample-user-id',
    assignedAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(), // 28 days from now
    status: 'active',
    notesForUser: 'Follow this routine consistently',
    progress: {
      completedWorkouts: 0,
      totalWorkouts: 12,
      lastWorkoutDate: null,
      feedback: ''
    }
  });
  console.log(`Inserted sample routine assignment with ID: ${assignmentResult.insertedId}`);
  
  // Sample workout session document
  const sessionResult = await db.collection('workout_sessions').insertOne({
    userId: 'sample-user-id',
    routineAssignmentId: assignmentResult.insertedId,
    parentRoutineId: routineResult.insertedId,
    routineVersionId: routineResult.insertedId,
    workoutId: workoutResult.insertedId,
    scheduledDate: new Date().toISOString(),
    scheduledTime: '08:00',
    status: 'scheduled',
    completedAt: null,
    durationMinutes: null,
    notes: '',
    workoutSnapshot: {
      name: 'Sample Full Body Workout',
      type: 'strength',
      objective: 'Build overall strength',
      sections: [
        {
          name: 'Sample Warmup',
          type: 'warmup',
          notes: 'A basic warmup routine',
          restAfter: '00:01:00',
          exercises: [
            {
              name: 'Jumping Jacks',
              sets: 1,
              reps: 20,
              weight: null,
              notes: 'Moderate pace'
            }
          ]
        },
        {
          name: 'Main Workout',
          type: 'basic',
          notes: 'Focus on form',
          restAfter: '00:02:00',
          exercises: [
            {
              name: 'Squats',
              sets: 3,
              reps: 10,
              weight: null,
              notes: 'Bodyweight'
            }
          ]
        }
      ]
    },
    performanceLog: {
      sections: []
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  console.log(`Inserted sample workout session with ID: ${sessionResult.insertedId}`);
  
  console.log('Sample documents created successfully!');
}

module.exports = { createSampleDocuments };

