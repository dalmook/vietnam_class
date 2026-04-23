import { Link } from 'react-router-dom';
import { Lesson } from '../types/lesson';

interface LessonCardProps {
  lesson: Lesson;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
}

export function LessonCard({ lesson, progress, isLocked, isCompleted }: LessonCardProps) {
  const cardClassName = `block rounded-2xl p-4 shadow-sm ring-1 transition ${
    isLocked
      ? 'cursor-not-allowed bg-slate-200 ring-slate-300 opacity-80'
      : 'bg-white ring-slate-200 hover:shadow-md'
  }`;

  const content = (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-teal-700">{lesson.unitLabel}</span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
            {isLocked ? '잠김' : '열림'}
          </span>
          {isCompleted ? (
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
              완료
            </span>
          ) : null}
        </div>
      </div>
      <h2 className="text-lg font-bold">{lesson.titleKo}</h2>
      <p className="mt-1 text-sm text-slate-600">{lesson.topicOverview}</p>
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>진행률</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-primary-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      {isLocked ? <p className="mt-3 text-xs text-slate-500">이전 레슨을 완료하면 열립니다.</p> : null}
    </>
  );

  if (isLocked) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link to={`/lessons/${lesson.lessonId}`} className={cardClassName}>
      {content}
    </Link>
  );
}
