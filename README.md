# Vietnamese A1 Learning App

GitHub Pages에 배포되는 **정적 베트남어 학습 웹앱**입니다.

## 핵심 제약
- 서버 없음 (No backend)
- API / serverless 없음
- 브라우저 비밀키 사용 없음
- 로컬 JSON 콘텐츠만 사용

## 현재 단계 (2단계)
- GitHub Pages 빈 화면(Blank Page) 배포 이슈 수정
- GitHub Actions 기반 `dist` 배포 파이프라인 추가
- 학습맵 lesson 잠금/해금 로직 연결
- 완료 판정 로직(2/3 규칙) 연결

## 왜 빈 화면이 떴는가?
기존 배포에서 발생 가능한 핵심 원인:
1. `dist`가 아닌 소스 루트가 정적 노출되면 브라우저가 TS/TSX 소스를 직접 실행하지 못함
2. 저장소 하위 경로(`/vietnam_class/`)와 Vite `base`가 맞지 않으면 JS/CSS 경로가 깨짐
3. Pages Source가 브랜치 정적 노출로 되어 있으면 빌드 산출물 관리가 불안정해질 수 있음

### 해결 방식
- Vite production base를 `/vietnam_class/`로 명시
- GitHub Actions에서 `npm ci -> npm run build -> dist 업로드` 후 Pages 배포
- Pages Source를 **GitHub Actions**로 설정
- 안정적인 `npm ci`를 위해 `package-lock.json`을 함께 커밋하는 것을 권장

## GitHub Pages 설정 방법
1. GitHub 저장소로 이동
2. **Settings > Pages** 열기
3. **Build and deployment > Source**를 `GitHub Actions`로 변경
4. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동 배포

## 폴더 구조
```txt
src/
  app/        # hash router
  pages/      # Home, Lesson detail
  components/ # Layout, Lesson card
  content/    # lesson JSON
  store/      # zustand store (persist/localStorage)
  types/      # data types
  utils/      # loader + progress/lock/completion logic
public/audio/ # 추후 오디오 파일 위치
```

## 실행 방법
```bash
npm install
npm run dev
```

## 빌드
```bash
npm run build
```

## 완료 판정 규칙
아래 3개 중 2개 이상 만족 시 lesson 완료:
- 카드학습 진도 80% 이상
- 퀴즈 1회 이상 시도
- 발음 따라하기 1회 이상 시도

## 다음 단계 (3단계 예정)
- 카드학습 화면/플로우 실제 구현
- 퀴즈 화면 및 결과 반영
- 발음 연습 화면과 오디오 자산 연결
