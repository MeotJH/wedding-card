# Database Setup Guide

## Supabase 설정 방법

### 1. Supabase 프로젝트 생성
1. [supabase.com](https://supabase.com)에 접속
2. 새 프로젝트 생성
3. 프로젝트 이름: `wedding-guestbook`
4. 데이터베이스 비밀번호 설정

### 2. 환경변수 설정
`.env` 파일을 프로젝트 루트에 생성하고 다음 내용 추가:

```env
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. 데이터베이스 스키마 생성
1. Supabase Dashboard → SQL Editor
2. `schema.sql` 파일의 내용을 복사하여 실행
3. 테이블과 정책이 정상적으로 생성되었는지 확인

### 4. 테이블 구조
```sql
guestbook_messages:
- id: UUID (Primary Key)
- name: VARCHAR(100) - 작성자 이름
- message: TEXT - 축하 메시지
- pos_x: DECIMAL(5,2) - 하트의 X 좌표 (0-100%)
- pos_y: DECIMAL(5,2) - 하트의 Y 좌표 (0-100%)
- created_at: TIMESTAMP - 생성 시간
- updated_at: TIMESTAMP - 수정 시간
```

### 5. 보안 정책
- RLS (Row Level Security) 활성화
- 모든 사용자가 메시지 읽기 가능
- 모든 사용자가 메시지 작성 가능
- 수정/삭제는 불가능 (방명록 특성상)

### 6. 테스트
애플리케이션 실행 후 방명록 기능이 정상 작동하는지 확인