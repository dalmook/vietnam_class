export interface LessonDatasetMeta {
  schemaVersion?: string;
  datasetId?: string;
  title?: string;
  sourcePdf?: string;
}

export interface LessonCardItem {
  id: string;
  term?: string;
  meaningKo?: string;
}

export interface LessonDialogue {
  id?: string;
  lines?: Array<{ speaker?: string; textVi?: string; textKo?: string }>;
}

export interface LessonQuizSeed {
  id?: string;
  type?: string;
  promptKo?: string;
}

export interface Lesson {
  lessonId: number;
  unitLabel?: string;
  titleKo?: string;
  titleVi?: string;
  goals?: string[];
  topicOverview?: string;
  vocabCards?: LessonCardItem[];
  sentenceCards?: LessonCardItem[];
  dialogues?: LessonDialogue[];
  quizSeeds?: LessonQuizSeed[];
  pronunciationTargets?: string[];
  unlockCondition?: string;
}

export interface LessonDataset {
  meta: LessonDatasetMeta;
  lessons: Lesson[];
}
