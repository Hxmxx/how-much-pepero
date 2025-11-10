# 빼빼로 하우 머치 🍫

내 얼굴은 빼빼로 몇 개? AI로 분석하는 재미있는 빼빼로 관상 서비스입니다.

## ✨ 주요 기능

- 📸 **사진 업로드/촬영**: 갤러리에서 사진을 선택하거나 카메라로 직접 촬영
- 🤖 **AI 분석**: Google Gemini AI를 활용한 얼굴 분석
- 📊 **결과 확인**: 빼빼로 개수, 타입, 성격 분석, 운세, 팁 제공
- 📤 **공유하기**: 결과를 이미지로 저장하고 공유 (인스타그램 스토리 지원)

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 또는 Bun
- Google Gemini API 키

### 설치

```bash
# 의존성 설치
bun install
# 또는
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 추가하세요:

```env
GOOGLE_GENAI_API_KEY=your_api_key_here
```

### 개발 서버 실행

```bash
bun dev
# 또는
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **AI**: Google Gemini API
- **Image Processing**: html2canvas

## 📁 프로젝트 구조

```
how-much-pepero/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── route.ts          # AI 분석 API
│   ├── page.tsx                  # 메인 페이지
│   ├── layout.tsx                 # 레이아웃
│   └── globals.css                # 전역 스타일
├── lib/
│   └── util.ts                    # 유틸리티 함수
└── public/                         # 정적 파일
```

## 🎯 사용 방법

1. 메인 화면에서 "사진 찍기" 또는 "사진 올리기" 버튼 클릭
2. 얼굴이 보이는 사진 업로드 또는 촬영
3. AI가 분석하는 동안 잠시 대기
4. 결과 확인 (빼빼로 개수, 타입, 성격 분석 등)
5. "공유하기" 또는 "인스타 스토리" 버튼으로 결과 공유

## 📝 주의사항

- 업로드한 이미지는 서버에 저장되지 않습니다
- AI 분석을 위해 Google Gemini API가 필요합니다
- 카메라 기능은 HTTPS 환경에서만 작동합니다

## 🤝 기여하기

이슈나 풀 리퀘스트를 환영합니다!

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [Google Gemini](https://ai.google.dev/) - AI 분석 기능
- [Next.js](https://nextjs.org/) - 웹 프레임워크
- [Tailwind CSS](https://tailwindcss.com/) - 스타일링

---

Made with ❤️ for 빼빼로 데이
