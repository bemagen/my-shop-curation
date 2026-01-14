"use client"; // 👈 중요! 클릭 기능을 쓰기 위한 선언

import { useState } from 'react'; // 상태 관리(기억력) 도구
import { reviews } from '../lib/data';
import ReviewCard from '../components/ReviewCard';

export default function Home() {
  // 1. 현재 선택된 카테고리를 기억하는 변수 (기본값: '전체')
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 2. 우리가 사용할 카테고리 버튼 목록
  const categories = ['전체', '다이소', '밀키트', '가전', '인테리어'];

  // 3. 선택된 카테고리에 맞는 영상만 걸러내기 (필터링 로직)
  const filteredReviews = selectedCategory === '전체'
    ? reviews
    : reviews.filter((item) => 
        // 태그 중에 카테고리 단어가 포함된 게 있는지 확인
        item.tags.some(tag => tag.includes(selectedCategory))
      );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* 헤더 & 기부 배너 */}
      <header style={{ background: 'white', borderBottom: '1px solid #eee', padding: '20px 0', marginBottom: '30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#333' }}>🧺 QuickPick</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#888' }}>고민 없는 3줄 요약 쇼핑</p>
          </div>
          <div style={{ background: '#e3f2fd', padding: '10px 20px', borderRadius: '20px', color: '#1565c0', fontSize: '0.9rem', fontWeight: 'bold' }}>
            👼 이번 달 보육원 후원 예정: <span style={{ fontSize: '1.2rem', color: '#0d47a1' }}>152,000원</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 🔥 새로 추가된 부분: 카테고리 필터 버튼 */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)} // 클릭하면 카테고리 변경
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                // 선택된 버튼은 파란색, 나머지는 회색으로 표시
                backgroundColor: selectedCategory === category ? '#0070f3' : '#e9ecef',
                color: selectedCategory === category ? 'white' : '#495057',
                boxShadow: selectedCategory === category ? '0 4px 6px rgba(0,112,243,0.3)' : 'none'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 필터링된 결과 보여주기 */}
        <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>
          {selectedCategory === '전체' ? '🔥 지금 뜨는 생활 꿀템' : `🔍 ${selectedCategory} 관련 리뷰`}
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '25px' 
        }}>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((item) => (
              <ReviewCard key={item.id} review={item} />
            ))
          ) : (
            <p style={{ color: '#888', gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
              해당하는 리뷰가 없습니다. 다른 카테고리를 눌러보세요!
            </p>
          )}
        </div>
      </main>

    </div>
  );
}