# Vietnamese A1 Learning App (Step 1)

GitHub Pages에 배포하기 위한 **정적 베트남어 학습 웹앱**의 1단계 뼈대입니다.

## 핵심 원칙
- 서버 없음 (No backend)
- API/serverless 없음
- 브라우저 비밀키 사용 없음
- 로컬 JSON 기반 콘텐츠만 사용

## 현재 구현 범위 (1단계)
- React + Vite + TypeScript + Tailwind CSS 구성
- Hash Router 기반 페이지 라우팅
- 홈(학습맵) / 레슨 상세 골격
- JSON 데이터 로드 및 타입/유틸 분리
- Zustand + localStorage 학습 상태 구조 초기화

## 폴더 구조
```txt
src/
  app/        # router
  pages/      # Home, Lesson detail
  components/ # Layout, Lesson card
  content/    # lesson JSON
  store/      # zustand store
  types/      # data types
  utils/      # dataset loader
public/audio/ # 추후 발음 파일 위치
```

## 시작 방법
```bash
npm install
npm run dev
```

## 빌드 및 배포
```bash
npm run build
```
- GitHub Pages 정적 배포를 고려해 `HashRouter`를 사용합니다.
- Vite `base`는 상대 경로(`./`)로 설정되어 정적 호스팅에서 경로 깨짐을 줄입니다.

## 다음 단계 예정 (2단계)
- 레슨 잠금 조건 실제 로직 연결
- 카드 학습(단어/문장) 플로우 연결
- 퀴즈/발음 섹션 기능화
