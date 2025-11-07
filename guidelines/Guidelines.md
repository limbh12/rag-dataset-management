# RAG Dataset Management - 프로젝트 지침

## 📋 프로젝트 개요

RAG(Retrieval-Augmented Generation) Dataset Management는 벡터 데이터베이스와 문서 임베딩을 관리하는 웹 기반 애플리케이션입니다. 이 시스템은 대규모 문서 컬렉션을 효율적으로 관리하고, 벡터 임베딩을 생성하며, RAG 시스템의 데이터 품질을 모니터링하는 데 사용됩니다.

### 주요 기능
- **데이터셋 관리**: 문서 업로드, 조직, 버전 관리
- **벡터 임베딩**: 다양한 임베딩 모델 지원
- **대시보드**: 실시간 통계 및 성능 모니터링
- **품질 관리**: 임베딩 품질 분석 및 개선

---

## 🏗️ 프로젝트 구조

```
rag-dataset-management/
├── src/
│   ├── App.tsx                 # 메인 애플리케이션 컴포넌트
│   ├── main.tsx                # 엔트리 포인트
│   ├── index.css               # 글로벌 스타일
│   ├── components/             # React 컴포넌트
│   │   ├── Dashboard.tsx       # 대시보드 뷰
│   │   ├── DatasetList.tsx     # 데이터셋 목록
│   │   ├── DatasetDetail.tsx   # 데이터셋 상세 정보
│   │   ├── VectorManagement.tsx # 벡터 관리
│   │   ├── Settings.tsx        # 설정 페이지
│   │   ├── Sidebar.tsx         # 네비게이션 사이드바
│   │   ├── ui/                 # 재사용 가능한 UI 컴포넌트 (shadcn/ui)
│   │   └── figma/              # Figma 관련 컴포넌트
│   ├── guidelines/             # 프로젝트 문서
│   └── styles/                 # 스타일 파일
├── package.json                # 프로젝트 의존성
├── vite.config.ts              # Vite 설정
├── index.html                  # HTML 템플릿
└── README.md                   # 프로젝트 소개
```

---

## 🛠️ 기술 스택

### 프론트엔드 프레임워크
- **React 18.3.1**: UI 라이브러리
- **TypeScript**: 타입 안정성
- **Vite**: 빌드 툴 및 개발 서버

### UI/UX 라이브러리
- **Radix UI**: 접근성이 우수한 헤드리스 UI 컴포넌트
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **Lucide React**: 아이콘 라이브러리
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트 컬렉션

### 데이터 시각화
- **Recharts**: 차트 및 그래프 라이브러리

### 폼 관리
- **React Hook Form**: 효율적인 폼 상태 관리

### 기타 라이브러리
- **class-variance-authority**: 조건부 클래스 관리
- **clsx & tailwind-merge**: 클래스명 유틸리티
- **sonner**: 토스트 알림
- **next-themes**: 다크 모드 지원

---

## 🚀 시작하기

### 사전 요구사항
- Node.js (v16 이상 권장)
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 프리뷰
npm run preview
```

---

## 📐 코드 스타일 가이드

### TypeScript 규칙

1. **타입 정의**
   ```typescript
   // ✅ 좋은 예
   interface DatasetProps {
     id: string;
     name: string;
     onSelect: (id: string) => void;
   }
   
   // ❌ 나쁜 예
   interface DatasetProps {
     id: any;
     name: any;
     onSelect: Function;
   }
   ```

2. **컴포넌트 타입**
   ```typescript
   // 함수형 컴포넌트는 명시적 반환 타입 사용
   export function Dashboard({ onViewDataset }: DashboardProps) {
     // ...
   }
   ```

3. **상태 타입**
   ```typescript
   // 상태에 명시적 타입 지정
   const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
   ```

### React 컴포넌트 규칙

1. **컴포넌트 구조**
   ```typescript
   // 1. Imports
   import { useState } from 'react';
   import { Button } from './ui/button';
   
   // 2. Types/Interfaces
   interface ComponentProps {
     // ...
   }
   
   // 3. Component
   export function Component({ prop }: ComponentProps) {
     // 4. Hooks
     const [state, setState] = useState();
     
     // 5. Event handlers
     const handleClick = () => {
       // ...
     };
     
     // 6. Return JSX
     return (
       <div>
         {/* ... */}
       </div>
     );
   }
   ```

2. **Props 전달**
   - Props는 구조 분해 할당으로 받기
   - 선택적 props는 `?` 사용
   - 기본값이 필요한 경우 파라미터 기본값 사용

3. **이벤트 핸들러 네이밍**
   ```typescript
   // ✅ 좋은 예
   const handleClick = () => {};
   const handleSubmit = () => {};
   const handleChange = () => {};
   
   // Props로 전달할 때
   interface Props {
     onClick: () => void;
     onSubmit: () => void;
     onChange: (value: string) => void;
   }
   ```

### CSS/Tailwind 규칙

1. **클래스 순서**
   ```tsx
   // 레이아웃 → 크기 → 스타일 → 상태
   <div className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-gray-50">
   ```

2. **조건부 클래스**
   ```typescript
   import { cn } from './ui/utils';
   
   <div className={cn(
     "base-classes",
     condition && "conditional-classes",
     variant === 'primary' && "primary-classes"
   )}>
   ```

---

## 🎨 UI 컴포넌트 사용 가이드

### shadcn/ui 컴포넌트

프로젝트는 shadcn/ui 컴포넌트 라이브러리를 사용합니다. 모든 UI 컴포넌트는 `src/components/ui/` 디렉토리에 있습니다.

#### 주요 컴포넌트 예시

1. **Button**
   ```tsx
   import { Button } from './ui/button';
   
   <Button variant="default" size="default">
     클릭
   </Button>
   ```

2. **Card**
   ```tsx
   import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
   
   <Card>
     <CardHeader>
       <CardTitle>제목</CardTitle>
     </CardHeader>
     <CardContent>
       내용
     </CardContent>
   </Card>
   ```

3. **Dialog**
   ```tsx
   import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
   
   <Dialog>
     <DialogTrigger asChild>
       <Button>열기</Button>
     </DialogTrigger>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>다이얼로그 제목</DialogTitle>
       </DialogHeader>
       <div>내용</div>
     </DialogContent>
   </Dialog>
   ```

---

## 📊 데이터 관리

### 데이터셋 구조

```typescript
interface Dataset {
  id: string;
  name: string;
  description: string;
  vectors: number;           // 벡터 수
  documents: number;         // 문서 수
  size: string;              // 데이터 크기
  model: string;             // 임베딩 모델
  updated: string;           // 마지막 업데이트
  status: 'active' | 'processing' | 'error';
  category: string;
}
```

### 상태 관리

현재 프로젝트는 React의 `useState`를 사용한 로컬 상태 관리를 사용합니다.

```typescript
// App.tsx에서의 전역 상태
const [currentPage, setCurrentPage] = useState('dashboard');
const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
```

**향후 확장 고려사항:**
- 복잡한 상태 관리가 필요한 경우 Redux, Zustand, 또는 React Query 도입
- 서버 상태 관리를 위한 TanStack Query (React Query) 권장

---

## 🔄 페이지 네비게이션

### 페이지 구조

```typescript
const pages = {
  dashboard: <Dashboard />,      // 메인 대시보드
  datasets: <DatasetList />,     // 데이터셋 목록
  vectors: <VectorManagement />, // 벡터 관리
  settings: <Settings />,        // 설정
};
```

### 라우팅 로직

```typescript
// 조건부 렌더링 기반 라우팅
const renderPage = () => {
  if (selectedDataset) {
    return <DatasetDetail datasetId={selectedDataset} />;
  }
  
  switch (currentPage) {
    case 'dashboard': return <Dashboard />;
    case 'datasets': return <DatasetList />;
    // ...
  }
};
```

**향후 개선사항:**
- React Router 도입 고려 (URL 기반 라우팅)
- 브라우저 히스토리 관리
- Deep linking 지원

---

## 🧪 테스트 가이드

### 테스트 전략 (향후 구현)

```typescript
// 컴포넌트 테스트 예시
describe('Dashboard', () => {
  it('should render stats correctly', () => {
    // 테스트 코드
  });
  
  it('should handle dataset selection', () => {
    // 테스트 코드
  });
});
```

**권장 테스트 라이브러리:**
- Jest
- React Testing Library
- Vitest (Vite와 통합이 우수)

---

## 🔒 보안 가이드

### API 키 관리

```typescript
// ✅ 환경 변수 사용
const EMBEDDING_API_KEY = import.meta.env.VITE_EMBEDDING_API_KEY;

// ❌ 하드코딩 금지
const EMBEDDING_API_KEY = 'sk-1234567890abcdef';
```

### 환경 변수 설정

`.env.local` 파일 생성:
```env
VITE_API_URL=https://api.example.com
VITE_EMBEDDING_API_KEY=your-api-key
```

---

## 📦 컴포넌트 개발 가이드

### 새 컴포넌트 추가

1. **컴포넌트 파일 생성**
   ```bash
   # src/components/NewComponent.tsx
   ```

2. **기본 구조 작성**
   ```typescript
   import { ComponentProps } from 'react';
   
   interface NewComponentProps {
     title: string;
     onAction: () => void;
   }
   
   export function NewComponent({ title, onAction }: NewComponentProps) {
     return (
       <div>
         <h2>{title}</h2>
         <button onClick={onAction}>액션</button>
       </div>
     );
   }
   ```

3. **스타일 적용**
   - Tailwind CSS 클래스 사용
   - 필요시 UI 컴포넌트 임포트

4. **타입 안전성 확인**
   ```bash
   npm run build
   ```

### UI 컴포넌트 커스터마이징

shadcn/ui 컴포넌트를 커스터마이징할 때:

```typescript
// src/components/ui/custom-button.tsx
import { Button } from './button';
import { cn } from './utils';

export function CustomButton({ className, ...props }) {
  return (
    <Button 
      className={cn("custom-styles", className)} 
      {...props} 
    />
  );
}
```

---

## 🎯 성능 최적화

### React 최적화

1. **메모이제이션**
   ```typescript
   import { memo, useMemo, useCallback } from 'react';
   
   // 컴포넌트 메모이제이션
   export const ExpensiveComponent = memo(function ExpensiveComponent(props) {
     // ...
   });
   
   // 값 메모이제이션
   const computedValue = useMemo(() => {
     return expensiveCalculation(data);
   }, [data]);
   
   // 함수 메모이제이션
   const handleClick = useCallback(() => {
     // ...
   }, [dependencies]);
   ```

2. **코드 스플리팅**
   ```typescript
   import { lazy, Suspense } from 'react';
   
   const DatasetDetail = lazy(() => import('./components/DatasetDetail'));
   
   <Suspense fallback={<div>Loading...</div>}>
     <DatasetDetail />
   </Suspense>
   ```

### 번들 최적화

- Vite의 자동 코드 스플리팅 활용
- 필요한 컴포넌트만 임포트
- 이미지 최적화 (WebP, lazy loading)

---

## 🐛 디버깅 가이드

### 개발 도구

1. **React DevTools**
   - 컴포넌트 계층 구조 확인
   - Props 및 State 검사

2. **Vite 개발 서버**
   - Hot Module Replacement (HMR)
   - 에러 오버레이

### 일반적인 문제 해결

#### 타입 에러
```typescript
// 에러: Type 'string' is not assignable to type 'number'
// 해결: 명시적 타입 변환
const num = parseInt(stringValue);
```

#### 렌더링 문제
```typescript
// React key 경고
// 해결: 고유한 key 사용
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

---

## 🚢 배포 가이드

### 프로덕션 빌드

```bash
# 빌드 생성
npm run build

# 빌드 결과물은 dist/ 폴더에 생성됨
```

### 배포 플랫폼

**권장 플랫폼:**
- Vercel (추천)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Vercel 배포 예시

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

---

## 🔧 확장 가능성

### 백엔드 통합

현재는 프론트엔드 전용 프로젝트입니다. 백엔드 통합 시:

```typescript
// API 클라이언트 예시
const fetchDatasets = async () => {
  const response = await fetch('/api/datasets');
  return response.json();
};
```

### 추천 백엔드 스택
- **Node.js + Express**: REST API
- **FastAPI**: Python 기반, ML 통합 용이
- **Supabase**: 백엔드-as-a-Service
- **Firebase**: 실시간 데이터베이스

### 데이터베이스
- **Vector DB**: Pinecone, Weaviate, Qdrant
- **문서 DB**: MongoDB, PostgreSQL
- **캐시**: Redis

---

## 📚 참고 자료

### 공식 문서
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

### 추가 학습 자료
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)

---

## 🤝 기여 가이드

### 코드 기여 프로세스

1. **브랜치 생성**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **코드 작성**
   - 코딩 스타일 가이드 준수
   - 타입 안전성 확인

3. **커밋**
   ```bash
   git commit -m "feat: Add new feature"
   ```

4. **푸시 및 PR**
   ```bash
   git push origin feature/new-feature
   ```

### 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 작업, 패키지 매니저 설정 등
```

---

## 📋 체크리스트

### 새 기능 개발 체크리스트

- [ ] 타입스크립트 타입 정의 완료
- [ ] 컴포넌트 Props 인터페이스 정의
- [ ] 반응형 디자인 적용
- [ ] 접근성 고려 (a11y)
- [ ] 에러 핸들링 구현
- [ ] 로딩 상태 처리
- [ ] 빌드 에러 없음 확인
- [ ] 브라우저 테스트 완료

### 배포 전 체크리스트

- [ ] 프로덕션 빌드 성공
- [ ] 환경 변수 설정 확인
- [ ] API 엔드포인트 확인
- [ ] 성능 테스트 완료
- [ ] 보안 검토 완료
- [ ] 문서 업데이트

---

## 🔮 향후 개발 계획

### Phase 1: 핵심 기능 강화
- [ ] 실제 백엔드 API 통합
- [ ] 파일 업로드 기능 구현
- [ ] 벡터 검색 기능
- [ ] 실시간 처리 상태 모니터링

### Phase 2: 사용자 경험 개선
- [ ] 다크 모드 구현
- [ ] 다국어 지원 (i18n)
- [ ] 고급 필터링 및 정렬
- [ ] 대시보드 커스터마이징

### Phase 3: 고급 기능
- [ ] 벡터 유사도 시각화
- [ ] A/B 테스트 기능
- [ ] 자동화된 품질 체크
- [ ] 팀 협업 기능

### Phase 4: 엔터프라이즈
- [ ] 역할 기반 접근 제어 (RBAC)
- [ ] 감사 로그
- [ ] 고급 분석 및 리포팅
- [ ] API 레이트 리미팅

---

## ❓ FAQ

### Q: 새로운 UI 컴포넌트를 어떻게 추가하나요?
A: shadcn/ui CLI를 사용하거나, `src/components/ui/` 디렉토리에서 기존 컴포넌트를 참고하여 새 컴포넌트를 작성하세요.

### Q: 상태 관리를 어떻게 개선할 수 있나요?
A: 현재는 로컬 상태를 사용하지만, 프로젝트가 커지면 Zustand나 Redux Toolkit 도입을 고려하세요.

### Q: 백엔드는 어떻게 연결하나요?
A: `fetch` API나 `axios`를 사용하여 REST API를 호출하고, React Query로 서버 상태를 관리하세요.

### Q: 환경 변수는 어떻게 설정하나요?
A: `.env.local` 파일을 생성하고 `VITE_` 접두사를 붙여 변수를 정의하세요. `import.meta.env`로 접근합니다.

---

## 📞 지원

문제가 발생하거나 질문이 있는 경우:
- GitHub Issues에 이슈 등록
- 프로젝트 문서 확인
- 커뮤니티 포럼 참여

---

**문서 버전**: 1.0.0  
**최종 업데이트**: 2025년 11월 7일  
**작성자**: RAG Dataset Management Team
