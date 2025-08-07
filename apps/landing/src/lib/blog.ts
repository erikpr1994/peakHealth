export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  image?: string;
  readTime: number;
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    slug: '10-essential-exercises-for-beginners',
    title: '10 Essential Exercises for Beginners',
    excerpt:
      'Start your fitness journey with these fundamental exercises that build strength and confidence.',
    content: `
# 10 Essential Exercises for Beginners

Starting a fitness journey can be overwhelming, but these 10 essential exercises will give you a solid foundation to build upon.

## 1. Bodyweight Squats
Squats are the foundation of lower body strength. They target your quads, hamstrings, and glutes while improving balance and mobility.

**How to do it:**
- Stand with feet shoulder-width apart
- Lower your body as if sitting back into a chair
- Keep your chest up and knees behind your toes
- Return to standing position

## 2. Push-ups
Push-ups are excellent for building upper body strength and core stability.

**How to do it:**
- Start in a plank position
- Lower your body until your chest nearly touches the floor
- Push back up to the starting position

## 3. Plank
The plank is perfect for building core strength and stability.

**How to do it:**
- Hold your body in a straight line from head to heels
- Engage your core muscles
- Hold for 30-60 seconds

## 4. Lunges
Lunges improve balance, coordination, and leg strength.

**How to do it:**
- Step forward with one leg
- Lower your body until both knees are bent at 90 degrees
- Push back to the starting position

## 5. Mountain Climbers
This dynamic exercise gets your heart rate up while building core strength.

**How to do it:**
- Start in a plank position
- Alternate bringing your knees toward your chest
- Keep your core engaged throughout

## 6. Glute Bridges
Glute bridges strengthen your posterior chain and improve hip mobility.

**How to do it:**
- Lie on your back with knees bent
- Lift your hips toward the ceiling
- Squeeze your glutes at the top
- Lower back down

## 7. Bird Dogs
This exercise improves balance and core stability.

**How to do it:**
- Start on hands and knees
- Extend opposite arm and leg
- Hold for a few seconds
- Return to starting position

## 8. Wall Sits
Wall sits build leg endurance and strength.

**How to do it:**
- Lean against a wall with feet shoulder-width apart
- Slide down until thighs are parallel to the floor
- Hold the position

## 9. Jumping Jacks
A classic cardio exercise that gets your heart pumping.

**How to do it:**
- Jump while raising arms overhead
- Land with feet apart
- Jump back to starting position

## 10. Burpees
The ultimate full-body exercise that combines strength and cardio.

**How to do it:**
- Start standing, then squat down
- Place hands on the ground
- Jump feet back into plank position
- Perform a push-up
- Jump feet back to squat position
- Jump up with arms overhead

## Getting Started

Start with 2-3 sets of 10-15 repetitions for each exercise. As you get stronger, gradually increase the number of sets and repetitions.

Remember to:
- Warm up before exercising
- Listen to your body
- Stay consistent
- Progress gradually

These exercises will help you build a strong foundation for your fitness journey!
    `,
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    tags: ['beginner', 'strength training', 'bodyweight exercises'],
    readTime: 8,
  },
  {
    slug: 'nutrition-guide-for-muscle-building',
    title: 'Complete Nutrition Guide for Muscle Building',
    excerpt:
      'Learn the essential nutrition principles to support your muscle building goals and maximize your gains.',
    content: `
# Complete Nutrition Guide for Muscle Building

Building muscle requires more than just lifting weights. Your nutrition plays a crucial role in your success.

## Protein: The Building Block

Protein is essential for muscle repair and growth. Aim for 1.6-2.2 grams of protein per kilogram of body weight daily.

**Best protein sources:**
- Lean meats (chicken, turkey, beef)
- Fish and seafood
- Eggs
- Dairy products
- Legumes
- Plant-based proteins

## Carbohydrates: Your Energy Source

Carbs fuel your workouts and help with recovery. Include complex carbohydrates in your diet.

**Good carb sources:**
- Oats
- Brown rice
- Sweet potatoes
- Quinoa
- Whole grain bread
- Fruits and vegetables

## Healthy Fats: Don't Skip Them

Fats are important for hormone production and overall health.

**Healthy fat sources:**
- Avocados
- Nuts and seeds
- Olive oil
- Fatty fish
- Coconut oil

## Meal Timing

**Pre-workout (2-3 hours before):**
- Complex carbs + protein
- Example: Oatmeal with berries and protein powder

**Post-workout (within 30 minutes):**
- Protein + simple carbs
- Example: Protein shake with banana

## Hydration

Stay hydrated throughout the day, especially during workouts. Aim for at least 8-10 glasses of water daily.

## Supplements

While not necessary, some supplements can help:
- Protein powder
- Creatine
- Vitamin D
- Omega-3 fatty acids

## Sample Meal Plan

**Breakfast:**
- Oatmeal with berries and nuts
- Greek yogurt
- Protein shake

**Lunch:**
- Grilled chicken breast
- Brown rice
- Mixed vegetables

**Dinner:**
- Salmon
- Sweet potato
- Broccoli

**Snacks:**
- Protein bar
- Greek yogurt with fruit
- Nuts and seeds

## Tips for Success

1. **Track your macros** - Use an app to monitor your intake
2. **Eat consistently** - Don't skip meals
3. **Plan ahead** - Meal prep saves time and ensures you eat well
4. **Listen to your body** - Adjust portions based on your needs
5. **Be patient** - Muscle building takes time

Remember, nutrition is just as important as your workout routine. Focus on whole, nutrient-dense foods and stay consistent with your eating habits.
    `,
    author: 'Mike Chen',
    publishedAt: '2024-01-10',
    tags: ['nutrition', 'muscle building', 'diet'],
    readTime: 12,
  },
  {
    slug: 'cardio-vs-strength-training',
    title: 'Cardio vs Strength Training: Which Should You Choose?',
    excerpt:
      'Understanding the benefits of both cardio and strength training to create the perfect workout balance.',
    content: `
# Cardio vs Strength Training: Which Should You Choose?

Both cardio and strength training offer unique benefits. The key is finding the right balance for your goals.

## Cardiovascular Exercise

**Benefits:**
- Improves heart health
- Burns calories
- Increases endurance
- Reduces stress
- Improves mood

**Types of cardio:**
- Running
- Cycling
- Swimming
- Rowing
- HIIT workouts

## Strength Training

**Benefits:**
- Builds muscle mass
- Increases metabolism
- Improves bone density
- Enhances functional strength
- Prevents injury

**Types of strength training:**
- Weightlifting
- Bodyweight exercises
- Resistance bands
- Functional training

## Finding Your Balance

**For weight loss:**
- 3-4 days of cardio
- 2-3 days of strength training
- Focus on compound movements

**For muscle building:**
- 4-5 days of strength training
- 1-2 days of cardio
- Prioritize progressive overload

**For general fitness:**
- 3 days of strength training
- 2-3 days of cardio
- Mix of both types

## Sample Weekly Schedule

**Monday:** Upper body strength
**Tuesday:** Cardio (30-45 minutes)
**Wednesday:** Lower body strength
**Thursday:** Cardio (30-45 minutes)
**Friday:** Full body strength
**Saturday:** Active recovery (walking, yoga)
**Sunday:** Rest

## Tips for Success

1. **Start gradually** - Don't overdo it in the beginning
2. **Listen to your body** - Rest when needed
3. **Mix it up** - Variety prevents boredom
4. **Track progress** - Monitor your improvements
5. **Stay consistent** - Regular exercise is key

## Common Mistakes

- **Too much cardio** - Can lead to muscle loss
- **Neglecting cardio** - Important for heart health
- **Poor form** - Focus on technique over weight
- **Inconsistent routine** - Stick to your schedule

## Conclusion

The best approach is to include both cardio and strength training in your routine. The exact balance depends on your goals, but both are essential for overall health and fitness.

Start with a balanced approach and adjust based on your progress and preferences.
    `,
    author: 'Emma Rodriguez',
    publishedAt: '2024-01-05',
    tags: ['cardio', 'strength training', 'workout planning'],
    readTime: 10,
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  // In a real app, this would fetch from a CMS or database
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // In a real app, this would fetch from a CMS or database
  return blogPosts.find(post => post.slug === slug) || null;
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return blogPosts.filter(post => post.tags.includes(tag));
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
