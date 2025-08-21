# Firebase Setup Guide

## Firebase 프로젝트 생성 및 설정

### 1. Firebase 프로젝트 생성
1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `wedding-guestbook` (또는 원하는 이름)
4. Google Analytics 사용 여부 선택 (선택사항)

### 2. Firestore Database 설정
1. Firebase Console에서 "Firestore Database" 선택
2. "데이터베이스 만들기" 클릭
3. 시작 모드: "테스트 모드"로 시작 (나중에 보안 규칙 적용)
4. 위치: 가까운 지역 선택 (예: asia-northeast1)

### 3. 웹 앱 등록
1. Firebase Console에서 "프로젝트 설정" → "일반" 탭
2. "앱" 섹션에서 웹 아이콘(</>)클릭
3. 앱 닉네임: `wedding-card-app`
4. Firebase SDK 설정 정보 복사

### 4. 환경변수 설정
`.env.example`을 `.env`로 복사하고 Firebase SDK 설정 값을 입력:

```env
REACT_APP_FIREBASE_API_KEY=실제_API_키
REACT_APP_FIREBASE_AUTH_DOMAIN=프로젝트ID.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=실제_프로젝트_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=프로젝트ID.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=실제_센더_ID
REACT_APP_FIREBASE_APP_ID=실제_앱_ID
```

### 5. Firestore 보안 규칙 설정
1. Firebase Console → Firestore Database → 규칙
2. `firestore.rules` 파일의 내용을 복사하여 붙여넣기
3. "게시" 버튼 클릭

### 6. Firebase SDK 설치
```bash
npm install firebase
```

### 7. 데이터 구조
Firestore에서 자동으로 생성되는 컬렉션:

**guestbook_messages 컬렉션:**
- **name**: string - 작성자 이름 (최대 100자)
- **message**: string - 축하 메시지 (최대 1000자)  
- **posX**: number - 하트의 X 좌표 (0-100%)
- **posY**: number - 하트의 Y 좌표 (0-100%)
- **createdAt**: timestamp - 생성 시간 (자동)

### 8. 테스트
1. 애플리케이션 실행: `npm start`
2. `/guestbook` 페이지로 이동
3. 메시지 작성 및 표시 기능 테스트

### 보안 주의사항
- `.env` 파일은 절대 Git에 커밋하지 마세요
- 프로덕션 배포 전에 Firestore 보안 규칙을 반드시 적용하세요
- Firebase API 키는 공개되어도 괜찮지만, 보안 규칙으로 접근을 제어해야 합니다