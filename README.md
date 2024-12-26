# 싱싱상회 블로그

기술 블로그 프로젝트입니다.

## 기술 스택

### Frontend
- React 18.3
- TypeScript
- TanStack
  - Router
  - Query
  - Table
- Tailwind CSS
- Shadcn/ui

### 배포
- GitHub Actions
- Nginx

## 주요 기능

### 게시글
- 게시글 목록 조회
- 게시글 상세 조회
- 마크다운 렌더링
- 코드 하이라이팅

### 연재물
- 연재물 목록 조회
- 연재물별 게시글 목록

### 주제
- 주제 목록 조회
- 주제별 게시글/연재물 목록

## 프로젝트 구조

```tree
src/
├── assets/         # 정적 자원
├── components/     # 컴포넌트
│   ├── custom-ui/  # 커스텀 컴포넌트
│   └── ui/         # Shadcn/ui 컴포넌트
├── lib/           # 유틸리티
│   ├── api/       # API 관련 모듈
│   ├── schema/    # 스키마 정의
│   ├── store/     # 상태 관리
│   └── utils.ts   # 유틸리티 함수
└── routes/        # 라우트 정의
```

## 시작하기

### 요구사항
- Node.js 20.x
- pnpm 9.x

### 설치
```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

### 환경 변수
```bash
VITE_API_URL=     # API 서버 주소
```

## 배포

main 브랜치에 push 시 GitHub Actions를 통해 자동 배포됩니다.

```yaml:.github/workflows/deploy.yml
startLine: 1
endLine: 48
```

## 라이선스

MIT License

## 개발일지

```typescript:src/components/custom-ui/devlog/dev-log.tsx
startLine: 4
endLine: 37
```
