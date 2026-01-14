import { reviews } from '../lib/data';
import ReviewCard from '../components/ReviewCard';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* 1. 상단 네비게이션 & 기부 배너 */}
      <header style={{ background: 'white', borderBottom: '1px solid #eee', padding: '20px 0', marginBottom: '30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* 로고 영역 */}
          <div>
            <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#333' }}>🧺 QuickPick</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#888' }}>고민 없는 3줄 요약 쇼핑</p>
          </div>

          {/* 기부 임팩트 대시보드 (대표님 철학 반영) */}
          <div style={{ background: '#e3f2fd', padding: '10px 20px', borderRadius: '20px', color: '#1565c0', fontSize: '0.9rem', fontWeight: 'bold' }}>
            👼 이번 달 보육원 후원 예정: <span style={{ fontSize: '1.2rem', color: '#0d47a1' }}>152,000원</span>
          </div>
          
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>🔥 지금 뜨는 생활 꿀템</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '25px' 
        }}>
          {reviews.map((item) => (
            <ReviewCard key={item.id} review={item} />
          ))}
        </div>
      </main>

    </div>
  );
}