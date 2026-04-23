import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLearningStore } from '../store/learningStore';
import { isLessonLocked } from '../utils/lessonProgress';
import { getLessonById, getLessonDataset } from '../utils/lessonData';

const { lessons } = getLessonDataset();

export function LessonDetailPage() {
  const { lessonId } = useParams();
  const parsedLessonId = Number(lessonId);
  const lesson = Number.isFinite(parsedLessonId) ? getLessonById(parsedLessonId) : undefined;

  const completedLessons = useLearningStore((state) => state.completedLessons);
  const lessonProgress = useLearningStore((state) => state.lessonProgress);
  const quizAttempts = useLearningStore((state) => state.quizAttempts);
  const pronunciationAttempts = useLearningStore((state) => state.pronunciationAttempts);
  const setLastVisitedLesson = useLearningStore((state) => state.setLastVisitedLesson);
  const setCardProgress = useLearningStore((state) => state.setCardProgress);
  const addQuizAttempt = useLearningStore((state) => state.addQuizAttempt);
  const addPronunciationAttempt = useLearningStore((state) => state.addPronunciationAttempt);

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

  const locked = isLessonLocked(lesson.lessonId, lessons, completedLessons);

  useEffect(() => {
    if (!locked) {
      setLastVisitedLesson(lesson.lessonId);
    }
  }, [lesson.lessonId, locked, setLastVisitedLesson]);

  if (locked) {
    return (
      <section className="space-y-4">
        <Link className="text-sm text-teal-700 underline" to="/">
          ← 학습맵으로
        </Link>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-xl font-bold">{lesson.titleKo}</h1>
          <p className="mt-2 text-sm text-slate-600">
            이 레슨은 아직 잠겨 있습니다. 이전 레슨을 완료하면 자동으로 해금됩니다.
          </p>
        </div>
      </section>
    );
  }

  const currentProgress = lessonProgress[lesson.lessonId] ?? 0;
  const currentQuizAttempts = quizAttempts[lesson.lessonId] ?? 0;
  const currentPronunciationAttempts = pronunciationAttempts[lesson.lessonId] ?? 0;

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

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-3 font-semibold">개발용 진행 상태</h2>
        <div className="space-y-2 text-sm text-slate-700">
          <p>카드학습 진도: {currentProgress}%</p>
          <p>퀴즈 시도: {currentQuizAttempts}회</p>
          <p>발음 시도: {currentPronunciationAttempts}회</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button
            className="rounded-lg bg-teal-50 px-2 py-2 text-xs font-semibold text-teal-700"
            onClick={() => setCardProgress(lesson.lessonId, currentProgress + 20)}
            type="button"
          >
            카드 +20%
          </button>
          <button
            className="rounded-lg bg-indigo-50 px-2 py-2 text-xs font-semibold text-indigo-700"
            onClick={() => addQuizAttempt(lesson.lessonId)}
            type="button"
          >
            퀴즈 +1
          </button>
          <button
            className="rounded-lg bg-purple-50 px-2 py-2 text-xs font-semibold text-purple-700"
            onClick={() => addPronunciationAttempt(lesson.lessonId)}
            type="button"
          >
            발음 +1
          </button>
        </div>
      </section>

      <section className="space-y-2">
        <button className="w-full rounded-xl bg-primary-500 px-4 py-3 font-semibold text-white" type="button">
          카드학습 시작
        </button>
        <button className="w-full rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white" type="button">
          퀴즈
        </button>
        <button className="w-full rounded-xl bg-slate-600 px-4 py-3 font-semibold text-white" type="button">
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
