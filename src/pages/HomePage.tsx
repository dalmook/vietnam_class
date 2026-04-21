import { LessonCard } from '../components/LessonCard';
import { useLearningStore } from '../store/learningStore';
import { getLessonDataset } from '../utils/lessonData';

const { lessons } = getLessonDataset();

export function HomePage() {
  const lessonProgress = useLearningStore((state) => state.lessonProgress);

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <p className="text-sm font-medium text-teal-700">Vietnamese A1</p>
        <h1 className="text-2xl font-bold">베트남어 학습맵</h1>
        <p className="text-sm text-slate-600">원하는 레슨을 눌러 학습을 시작하세요.</p>
      </header>

      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.lessonId}
            lesson={lesson}
            progress={lessonProgress[lesson.lessonId] ?? 0}
            isLocked={index > 0 && (lessonProgress[lessons[index - 1].lessonId] ?? 0) < 100}
          />
        ))}
      </div>
    </section>
  );
}
