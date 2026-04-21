import { createHashRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { LessonDetailPage } from '../pages/LessonDetailPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/lessons/:lessonId',
        element: <LessonDetailPage />
      }
    ]
  }
]);
