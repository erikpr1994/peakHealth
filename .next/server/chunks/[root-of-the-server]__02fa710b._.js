module.exports = {

"[project]/.next-internal/server/app/api/exercises/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/features/exercises/services/exerciseMappers.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "mapCategory": ()=>mapCategory,
    "mapDifficulty": ()=>mapDifficulty,
    "mapEquipment": ()=>mapEquipment,
    "mapMuscleGroup": ()=>mapMuscleGroup,
    "transformExercise": ()=>transformExercise,
    "transformExerciseVariant": ()=>transformExerciseVariant
});
function mapCategory(dbCategory) {
    switch(dbCategory){
        case 'Strength':
            return 'Strength';
        case 'Cardio':
            return 'Cardio';
        case 'Flexibility':
            return 'Flexibility';
        case 'Balance':
            return 'Balance';
        default:
            return 'Strength';
    }
}
function mapDifficulty(dbDifficulty) {
    switch(dbDifficulty){
        case 'Beginner':
            return 'Beginner';
        case 'Intermediate':
            return 'Intermediate';
        case 'Advanced':
            return 'Advanced';
        case 'Unknown':
            return 'Unknown';
        default:
            return 'Beginner';
    }
}
function mapEquipment(dbEquipment) {
    switch(dbEquipment){
        case 'Barbell':
            return 'Barbell';
        case 'Dumbbell':
            return 'Dumbbell';
        case 'Bodyweight':
            return 'Bodyweight';
        case 'Machine':
            return 'Machine';
        case 'Resistance Band':
            return 'Resistance Band';
        case 'Kettlebell':
            return 'Kettlebell';
        case 'Cable':
            return 'Cable';
        case 'Bench':
            return 'Bench';
        case 'Incline Bench':
            return 'Incline Bench';
        case 'Decline Bench':
            return 'Decline Bench';
        case 'Pull-up Bar':
            return 'Pull-up Bar';
        case 'Squat Rack':
            return 'Squat Rack';
        case 'Step':
            return 'Step';
        default:
            return 'Bodyweight';
    }
}
function mapMuscleGroup(dbMuscleGroup) {
    switch(dbMuscleGroup){
        case 'Chest':
            return 'Chest';
        case 'Back':
            return 'Back';
        case 'Legs':
            return 'Legs';
        case 'Arms':
            return 'Arms';
        case 'Shoulders':
            return 'Shoulders';
        case 'Core':
            return 'Core';
        case 'Glutes':
            return 'Glutes';
        case 'Biceps':
            return 'Biceps';
        case 'Triceps':
            return 'Triceps';
        case 'Cardio':
            return 'Cardio';
        case 'Full Body':
            return 'Full Body';
        case 'Upper Chest':
            return 'Upper Chest';
        case 'Lower Chest':
            return 'Lower Chest';
        case 'Front Delts':
            return 'Front Delts';
        case 'Obliques':
            return 'Obliques';
        case 'Quadriceps':
            return 'Quadriceps';
        case 'Hamstrings':
            return 'Hamstrings';
        default:
            return 'Core';
    }
}
function transformExerciseVariant(dbVariant, steps, tips, media) {
    return {
        id: dbVariant.id,
        name: dbVariant.name,
        alternativeNames: dbVariant.alternative_names,
        description: dbVariant.description,
        focus: dbVariant.focus,
        difficulty: mapDifficulty(dbVariant.difficulty),
        equipment: dbVariant.equipment.map(mapEquipment),
        muscleGroups: dbVariant.muscle_groups.map(mapMuscleGroup),
        secondaryMuscles: dbVariant.secondary_muscles?.map(mapMuscleGroup),
        isUnilateral: dbVariant.is_unilateral,
        instructions: dbVariant.instructions,
        steps: steps.sort((a, b)=>a.step_order - b.step_order).map((step)=>({
                title: step.title,
                description: step.description
            })),
        tips: tips ? {
            proTips: tips.pro_tips,
            commonMistakes: tips.common_mistakes,
            safetyNotes: tips.safety_notes
        } : undefined,
        media: media ? {
            images: media.images,
            videos: media.videos,
            featuredImage: media.featured_image,
            featuredVideo: media.featured_video
        } : undefined,
        prerequisites: undefined,
        created_at: new Date(dbVariant.created_at),
        updated_at: new Date(dbVariant.updated_at)
    };
}
function transformExercise(dbExercise, variants) {
    // Calculate summary from variants
    const difficulties = variants.map((v)=>v.difficulty);
    const allEquipment = new Set();
    const allMuscleGroups = new Set();
    variants.forEach((variant)=>{
        variant.equipment.forEach((eq)=>allEquipment.add(eq));
        variant.muscleGroups.forEach((mg)=>allMuscleGroups.add(mg));
    });
    return {
        id: dbExercise.id,
        name: dbExercise.name,
        alternativeNames: dbExercise.alternative_names,
        category: mapCategory(dbExercise.category),
        description: dbExercise.description,
        variants,
        mainVariantId: variants[0]?.id,
        icon: dbExercise.icon,
        iconColor: dbExercise.icon_color,
        isFavorite: false,
        isPopular: dbExercise.is_popular,
        isNew: dbExercise.is_new,
        rating: dbExercise.rating || undefined,
        summary: {
            difficultyRange: {
                min: difficulties.length > 0 ? (()=>{
                    const minLevel = Math.min(...difficulties.map((d)=>{
                        const levels = {
                            Beginner: 1,
                            Intermediate: 2,
                            Advanced: 3,
                            Unknown: 0
                        };
                        return levels[d] || 0;
                    }));
                    const levelToDifficulty = {
                        0: 'Unknown',
                        1: 'Beginner',
                        2: 'Intermediate',
                        3: 'Advanced'
                    };
                    return levelToDifficulty[minLevel] || 'Unknown';
                })() : 'Beginner',
                max: difficulties.length > 0 ? (()=>{
                    const maxLevel = Math.max(...difficulties.map((d)=>{
                        const levels = {
                            Beginner: 1,
                            Intermediate: 2,
                            Advanced: 3,
                            Unknown: 0
                        };
                        return levels[d] || 0;
                    }));
                    const levelToDifficulty = {
                        0: 'Unknown',
                        1: 'Beginner',
                        2: 'Intermediate',
                        3: 'Advanced'
                    };
                    return levelToDifficulty[maxLevel] || 'Unknown';
                })() : 'Beginner'
            },
            equipmentOptions: Array.from(allEquipment),
            primaryMuscleGroups: Array.from(allMuscleGroups)
        },
        tags: dbExercise.tags,
        relatedExercises: dbExercise.related_exercise_ids,
        created_at: new Date(dbExercise.created_at),
        updated_at: new Date(dbExercise.updated_at)
    };
}
}),
"[project]/src/features/exercises/services/dataAggregators.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ExerciseDataAggregators": ()=>ExerciseDataAggregators,
    "exerciseDataAggregators": ()=>exerciseDataAggregators
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseMappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/exercises/services/exerciseMappers.ts [app-route] (ecmascript)");
;
class ExerciseDataAggregators {
    /**
   * Aggregate exercise data from separate database queries
   */ aggregateExerciseData(exercises, variants, steps, tips, media) {
        const transformedExercises = [];
        for (const exercise of exercises){
            const exerciseVariants = variants.filter((v)=>v.exercise_id === exercise.id);
            const transformedVariants = [];
            for (const variant of exerciseVariants){
                const variantSteps = steps.filter((s)=>s.exercise_variant_id === variant.id);
                const variantTips = tips.find((t)=>t.exercise_variant_id === variant.id);
                const variantMedia = media.find((m)=>m.exercise_variant_id === variant.id);
                transformedVariants.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseMappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformExerciseVariant"])(variant, variantSteps, variantTips, variantMedia));
            }
            transformedExercises.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseMappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformExercise"])(exercise, transformedVariants));
        }
        return transformedExercises;
    }
    /**
   * Filter variants by search criteria
   */ filterVariantsByCriteria(variants, criteria) {
        return variants.filter((variant)=>{
            const typedVariant = variant;
            // Check difficulty filter
            if (criteria.difficulties && criteria.difficulties.length > 0 && !criteria.difficulties.includes(typedVariant.difficulty)) {
                return false;
            }
            // Check equipment filter
            if (criteria.equipment && criteria.equipment.length > 0 && !criteria.equipment.some((eq)=>typedVariant.equipment?.includes(eq))) {
                return false;
            }
            // Check muscle group filter
            if (criteria.muscleGroups && criteria.muscleGroups.length > 0 && !criteria.muscleGroups.some((mg)=>typedVariant.muscle_groups?.includes(mg))) {
                return false;
            }
            return true;
        });
    }
    /**
   * Transform joined exercise data from search results
   */ transformJoinedExerciseData(exercises, criteria) {
        const filteredExercises = [];
        for (const exercise of exercises){
            const typedExercise = exercise;
            const variants = typedExercise.exercise_variants || [];
            const filteredVariants = criteria ? this.filterVariantsByCriteria(variants, criteria) : variants;
            if (filteredVariants.length > 0) {
                const transformedVariants = filteredVariants.map((variant)=>{
                    const typedVariant = variant;
                    const steps = typedVariant.exercise_instruction_steps || [];
                    const tips = typedVariant.exercise_tips?.[0];
                    const media = typedVariant.exercise_media?.[0];
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseMappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformExerciseVariant"])(variant, steps, tips, media);
                });
                filteredExercises.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseMappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformExercise"])(exercise, transformedVariants));
            }
        }
        return filteredExercises;
    }
    /**
   * Transform user favorites data
   */ transformUserFavoritesData(favorites) {
        const exercises = [];
        for (const favorite of favorites){
            const typedFavorite = favorite;
            const exercise = typedFavorite.exercises;
            if (exercise && typeof exercise === 'object' && !Array.isArray(exercise)) {
                const typedExercise = exercise;
                const variants = typedExercise.exercise_variants || [];
                const transformedVariants = variants.map((variant)=>{
                    const typedVariant = variant;
                    const steps = typedVariant.exercise_instruction_steps || [];
                    const tips = typedVariant.exercise_tips?.[0];
                    const media = typedVariant.exercise_media?.[0];
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseMappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformExerciseVariant"])(variant, steps, tips, media);
                });
                const transformedExercise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseMappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformExercise"])(exercise, transformedVariants);
                transformedExercise.isFavorite = true;
                exercises.push(transformedExercise);
            }
        }
        return exercises;
    }
}
const exerciseDataAggregators = new ExerciseDataAggregators();
}),
"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/punycode [external] (punycode, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createClient": ()=>createClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$6$2e$1_$40$supabase$2b$supabase$2d$js$40$2$2e$53$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.6.1_@supabase+supabase-js@2.53.0/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$6$2e$1_$40$supabase$2b$supabase$2d$js$40$2$2e$53$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.6.1_@supabase+supabase-js@2.53.0/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$6$2e$1_$40$supabase$2b$supabase$2d$js$40$2$2e$53$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "http://127.0.0.1:54321"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/src/features/exercises/services/databaseQueries.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ExerciseDatabaseQueries": ()=>ExerciseDatabaseQueries,
    "exerciseDatabaseQueries": ()=>exerciseDatabaseQueries
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
;
class ExerciseDatabaseQueries {
    /**
   * Fetch all exercises with their related data
   */ async fetchExercisesWithRelatedData() {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        // Get all exercises
        const { data: exercises, error: exercisesError } = await supabase.from('exercises').select('*').order('name');
        if (exercisesError) throw exercisesError;
        if (!exercises) return {
            exercises: [],
            variants: [],
            steps: [],
            tips: [],
            media: []
        };
        // Get all variants for these exercises
        const exerciseIds = exercises.map((e)=>e.id);
        const { data: variants, error: variantsError } = await supabase.from('exercise_variants').select('*').in('exercise_id', exerciseIds).order('name');
        if (variantsError) throw variantsError;
        // Get instruction steps for all variants
        const variantIds = variants?.map((v)=>v.id) || [];
        const { data: steps, error: stepsError } = await supabase.from('exercise_instruction_steps').select('*').in('exercise_variant_id', variantIds).order('step_order');
        if (stepsError) throw stepsError;
        // Get tips for all variants
        const { data: tips, error: tipsError } = await supabase.from('exercise_tips').select('*').in('exercise_variant_id', variantIds);
        if (tipsError) throw tipsError;
        // Get media for all variants
        const { data: media, error: mediaError } = await supabase.from('exercise_media').select('*').in('exercise_variant_id', variantIds);
        if (mediaError) throw mediaError;
        return {
            exercises: exercises || [],
            variants: variants || [],
            steps: steps || [],
            tips: tips || [],
            media: media || []
        };
    }
    /**
   * Fetch a single exercise with its related data
   */ async fetchExerciseWithRelatedData(exerciseId) {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        // Get the exercise
        const { data: exercise, error: exerciseError } = await supabase.from('exercises').select('*').eq('id', exerciseId).single();
        if (exerciseError) throw exerciseError;
        if (!exercise) return {
            exercise: null,
            variants: [],
            steps: [],
            tips: [],
            media: []
        };
        // Get all variants for this exercise
        const { data: variants, error: variantsError } = await supabase.from('exercise_variants').select('*').eq('exercise_id', exerciseId).order('name');
        if (variantsError) throw variantsError;
        // Get instruction steps for all variants
        const variantIds = variants?.map((v)=>v.id) || [];
        const { data: steps, error: stepsError } = await supabase.from('exercise_instruction_steps').select('*').in('exercise_variant_id', variantIds).order('step_order');
        if (stepsError) throw stepsError;
        // Get tips for all variants
        const { data: tips, error: tipsError } = await supabase.from('exercise_tips').select('*').in('exercise_variant_id', variantIds);
        if (tipsError) throw tipsError;
        // Get media for all variants
        const { data: media, error: mediaError } = await supabase.from('exercise_media').select('*').in('exercise_variant_id', variantIds);
        if (mediaError) throw mediaError;
        return {
            exercise,
            variants: variants || [],
            steps: steps || [],
            tips: tips || [],
            media: media || []
        };
    }
    /**
   * Search exercises with joins
   */ async searchExercisesWithJoins(searchTerm, category) {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        let query = supabase.from('exercises').select(`
        *,
        exercise_variants (
          *,
          exercise_instruction_steps (*),
          exercise_tips (*),
          exercise_media (*)
        )
      `);
        // Apply filters
        if (searchTerm) {
            query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }
        if (category) {
            query = query.eq('category', category);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    }
    /**
   * Fetch user favorites with exercise data
   */ async fetchUserFavorites(userId) {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('user_exercise_favorites').select(`
        exercise_id,
        exercises (
          *,
          exercise_variants (
            *,
            exercise_instruction_steps (*),
            exercise_tips (*),
            exercise_media (*)
          )
        )
      `).eq('user_id', userId).order('created_at', {
            ascending: false
        });
        if (error) throw error;
        return data || [];
    }
    /**
   * Add exercise to user favorites
   */ async addToFavorites(userId, exerciseId) {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('user_exercise_favorites').insert({
            user_id: userId,
            exercise_id: exerciseId
        });
        if (error) throw error;
    }
    /**
   * Remove exercise from user favorites
   */ async removeFromFavorites(userId, exerciseId) {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.from('user_exercise_favorites').delete().eq('user_id', userId).eq('exercise_id', exerciseId);
        if (error) throw error;
    }
}
const exerciseDatabaseQueries = new ExerciseDatabaseQueries();
}),
"[project]/src/features/exercises/services/errorHandlers.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ExerciseErrorHandlers": ()=>ExerciseErrorHandlers,
    "exerciseErrorHandlers": ()=>exerciseErrorHandlers
});
class ExerciseErrorHandlers {
    /**
   * Handle database errors with consistent messaging
   */ handleDatabaseError(error, operation) {
        console.error(`Database error during ${operation}:`, error);
        // You can add more sophisticated error handling here
        // For example, logging to external services, retry logic, etc.
        throw new Error(`Failed to ${operation}`);
    }
    /**
   * Handle validation errors
   */ handleValidationError(message) {
        console.error('Validation error:', message);
        throw new Error(`Validation failed: ${message}`);
    }
    /**
   * Handle not found errors
   */ handleNotFoundError(resource, id) {
        const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`;
        throw new Error(message);
    }
    /**
   * Handle permission errors
   */ handlePermissionError(operation) {
        console.error(`Permission denied for operation: ${operation}`);
        throw new Error(`You don't have permission to ${operation}`);
    }
}
const exerciseErrorHandlers = new ExerciseErrorHandlers();
}),
"[project]/src/features/exercises/services/validators.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ExerciseValidators": ()=>ExerciseValidators,
    "exerciseValidators": ()=>exerciseValidators
});
class ExerciseValidators {
    /**
   * Validate exercise data structure
   */ validateExerciseData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }
        const exercise = data;
        return typeof exercise.id === 'string' && typeof exercise.name === 'string' && typeof exercise.category === 'string' && typeof exercise.description === 'string';
    }
    /**
   * Validate exercise array data
   */ validateExerciseArray(data) {
        if (!Array.isArray(data)) {
            return false;
        }
        return data.every((exercise)=>this.validateExerciseData(exercise));
    }
    /**
   * Validate favorite data structure
   */ validateFavoriteData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }
        const favorite = data;
        return Boolean(typeof favorite.exercise_id === 'string' && favorite.exercises && typeof favorite.exercises === 'object' && !Array.isArray(favorite.exercises));
    }
    /**
   * Validate search parameters
   */ validateSearchParams(params) {
        // All parameters are optional, so any combination is valid
        // You can add more specific validation rules here if needed
        return true;
    }
    /**
   * Validate user ID
   */ validateUserId(userId) {
        return typeof userId === 'string' && userId.length > 0;
    }
    /**
   * Validate exercise ID
   */ validateExerciseId(exerciseId) {
        return typeof exerciseId === 'string' && exerciseId.length > 0;
    }
}
const exerciseValidators = new ExerciseValidators();
}),
"[project]/src/features/exercises/services/exerciseService.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ExerciseService": ()=>ExerciseService,
    "exerciseService": ()=>exerciseService
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$dataAggregators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/exercises/services/dataAggregators.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$databaseQueries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/exercises/services/databaseQueries.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/exercises/services/errorHandlers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/exercises/services/validators.ts [app-route] (ecmascript)");
;
;
;
;
class ExerciseService {
    /**
   * Get all exercises with their variants
   */ async getAllExercises() {
        try {
            const { exercises, variants, steps, tips, media } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$databaseQueries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDatabaseQueries"].fetchExercisesWithRelatedData();
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$dataAggregators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDataAggregators"].aggregateExerciseData(exercises, variants, steps, tips, media);
        } catch (error) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleDatabaseError(error, 'fetch exercises');
        }
    }
    /**
   * Get a single exercise by ID with all its variants
   */ async getExerciseById(exerciseId) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseValidators"].validateExerciseId(exerciseId)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleValidationError('Invalid exercise ID');
            return null; // This line will never be reached, but satisfies TypeScript
        }
        try {
            const { exercise, variants, steps, tips, media } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$databaseQueries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDatabaseQueries"].fetchExerciseWithRelatedData(exerciseId);
            if (!exercise) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleNotFoundError('Exercise', exerciseId);
                return null; // This line will never be reached, but satisfies TypeScript
            }
            const exercises = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$dataAggregators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDataAggregators"].aggregateExerciseData([
                exercise
            ], variants, steps, tips, media);
            return exercises[0] || null;
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleDatabaseError(error, 'fetch exercise');
            return null; // This line will never be reached, but satisfies TypeScript
        }
    }
    /**
   * Search exercises by various criteria
   */ async searchExercises(params) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseValidators"].validateSearchParams(params)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleValidationError('Invalid search parameters');
            return []; // This line will never be reached, but satisfies TypeScript
        }
        try {
            const exercises = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$databaseQueries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDatabaseQueries"].searchExercisesWithJoins(params.searchTerm, params.category);
            const criteria = {
                difficulties: params.difficulties,
                equipment: params.equipment,
                muscleGroups: params.muscleGroups
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$dataAggregators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDataAggregators"].transformJoinedExerciseData(exercises, criteria);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleDatabaseError(error, 'search exercises');
            return []; // This line will never be reached, but satisfies TypeScript
        }
    }
    /**
   * Get user's favorite exercises
   */ async getUserFavoriteExercises(userId) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseValidators"].validateUserId(userId)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleValidationError('Invalid user ID');
            return []; // This line will never be reached, but satisfies TypeScript
        }
        try {
            const favorites = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$databaseQueries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDatabaseQueries"].fetchUserFavorites(userId);
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$dataAggregators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDataAggregators"].transformUserFavoritesData(favorites);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleDatabaseError(error, 'fetch user favorites');
            return []; // This line will never be reached, but satisfies TypeScript
        }
    }
    /**
   * Add exercise to user favorites
   */ async addToFavorites(userId, exerciseId) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseValidators"].validateUserId(userId)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleValidationError('Invalid user ID');
            return; // This line will never be reached, but satisfies TypeScript
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseValidators"].validateExerciseId(exerciseId)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleValidationError('Invalid exercise ID');
            return; // This line will never be reached, but satisfies TypeScript
        }
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$databaseQueries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDatabaseQueries"].addToFavorites(userId, exerciseId);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleDatabaseError(error, 'add to favorites');
        }
    }
    /**
   * Remove exercise from user favorites
   */ async removeFromFavorites(userId, exerciseId) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseValidators"].validateUserId(userId)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleValidationError('Invalid user ID');
            return; // This line will never be reached, but satisfies TypeScript
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseValidators"].validateExerciseId(exerciseId)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleValidationError('Invalid exercise ID');
            return; // This line will never be reached, but satisfies TypeScript
        }
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$databaseQueries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseDatabaseQueries"].removeFromFavorites(userId, exerciseId);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$errorHandlers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseErrorHandlers"].handleDatabaseError(error, 'remove from favorites');
        }
    }
}
const exerciseService = new ExerciseService();
}),
"[project]/src/app/api/exercises/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.4.5_@babel+core@7.28.0_@playwright+test@1.54.2_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/exercises/services/exerciseService.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const exercises = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$exercises$2f$services$2f$exerciseService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exerciseService"].getAllExercises();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            exercises
        });
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$4$2e$5_$40$babel$2b$core$40$7$2e$28$2e$0_$40$playwright$2b$test$40$1$2e$54$2e$2_react$2d$dom$40$19$2e$1$2e$1_react$40$19$2e$1$2e$1_$5f$react$40$19$2e$1$2e$1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch exercises'
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__02fa710b._.js.map