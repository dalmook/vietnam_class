import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { getLessonById } from '../utils/lessonData';

export function LessonDetailPage() {
  const { lessonId } = useParams();
  const parsedLessonId = Number(lessonId);
  const lesson = Number.isFinite(parsedLessonId) ? getLessonById(parsedLessonId) : undefined;
  const setLastVisitedLesson = useLearningStore((state) => state.setLastVisitedLesson);

  if (!lesson) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-bold">레슨을 찾을 수 없습니다.</h1>
        <Link className="text-teal-700 underline" to="/">
          홈으로 돌아가기
        </Link>
      </section>
    );
  }

  useEffect(() => {
    setLastVisitedLesson(lesson.lessonId);
  }, [lesson.lessonId, setLastVisitedLesson]);

  return (
    <section className="space-y-4">
      <Link className="text-sm text-teal-700 underline" to="/">
        ← 학습맵으로
      </Link>

      <header className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-teal-700">{lesson.unitLabel}</p>
        <h1 className="text-2xl font-bold">{lesson.titleKo}</h1>
        <p className="mt-1 text-sm text-slate-600">{lesson.topicOverview}</p>
      </header>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-2 font-semibold">학습 목표</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {lesson.goals?.map((goal, index) => <li key={`${goal}-${index}`}>{goal}</li>)}
        </ul>
      </section>

      <section className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <Count label="단어 카드" value={lesson.vocabCards?.length ?? 0} />
        <Count label="문장 카드" value={lesson.sentenceCards?.length ?? 0} />
        <Count label="대화" value={lesson.dialogues?.length ?? 0} />
        <Count label="퀴즈" value={lesson.quizSeeds?.length ?? 0} />
        <Count label="발음" value={lesson.pronunciationTargets?.length ?? 0} />
      </section>

      <section className="space-y-2">
        <button className="w-full rounded-xl bg-primary-500 px-4 py-3 font-semibold text-white">
          카드학습 시작
        </button>
        <button className="w-full rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white">퀴즈</button>
        <button className="w-full rounded-xl bg-slate-600 px-4 py-3 font-semibold text-white">
          발음 따라하기
        </button>
      </section>
    </section>
  );
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-100 p-3 text-center">
      <p className="text-xs text-slate-600">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
