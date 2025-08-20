export function overallProgress(state) {
    // MVP assumes 9 lessons total (3 per module) + 1 quiz for HTML
    const lessonTotal = 9;
    const lessonDone = Object.values(state.lessons)
      .flatMap((m) => Object.values(m))
      .filter(Boolean).length;
  
    const quizDone = state.quizzes?.html?.score ? 1 : 0;
    const denom = lessonTotal + 1;
    const num = lessonDone + quizDone;
  
    return Math.round((num / denom) * 100);
  }
  