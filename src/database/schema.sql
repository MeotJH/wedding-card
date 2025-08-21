-- Supabase 방명록 메시지 테이블 스키마
-- 이 SQL을 Supabase Dashboard의 SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS guestbook_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    pos_x DECIMAL(5,2) NOT NULL CHECK (pos_x >= 0 AND pos_x <= 100),
    pos_y DECIMAL(5,2) NOT NULL CHECK (pos_y >= 0 AND pos_y <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_guestbook_messages_created_at ON guestbook_messages(created_at DESC);

-- RLS (Row Level Security) 활성화
ALTER TABLE guestbook_messages ENABLE ROW LEVEL SECURITY;

-- 정책 생성 - 모든 사용자가 읽을 수 있음
CREATE POLICY "Anyone can read guestbook messages" ON guestbook_messages
    FOR SELECT USING (true);

-- 정책 생성 - 모든 사용자가 생성할 수 있음
CREATE POLICY "Anyone can create guestbook messages" ON guestbook_messages
    FOR INSERT WITH CHECK (true);

-- 트리거 함수 생성 (updated_at 자동 업데이트)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE OR REPLACE TRIGGER update_guestbook_messages_updated_at
    BEFORE UPDATE ON guestbook_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 샘플 데이터 삽입 (테스트용)
INSERT INTO guestbook_messages (name, message, pos_x, pos_y) VALUES
('김하객', '결혼을 축하드립니다! 행복하세요 ❤️', 25.5, 35.2),
('이친구', '사랑이 가득한 가정 이루시길 바랍니다', 60.8, 50.7),
('박동료', '평생 함께 행복하게 살아요~', 40.3, 25.9),
('최가족', '진한이 수경이 결혼 축하해! 🎉', 75.1, 70.4),
('정지인', '두 분의 사랑을 응원합니다!', 30.7, 60.1);