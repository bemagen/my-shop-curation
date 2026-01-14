"use client";

import { useState } from 'react';
import { reviews } from '../lib/data';
import ReviewCard from '../components/ReviewCard';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 검색어 저장공간 추가

  const categories = ['전체', '다이소', '밀키트', '가전', '인테리어'];

  // 🔥 핵심 로직: 카테고리 필터 AND 검색어 필터 동시에 적용
  const filteredReviews = reviews.filter((item) => {
    // 1. 카테고리 조건 확인
    const categoryMatch = selectedCategory === '전체' 
      ? true 
      : item.tags.some(tag => tag.includes(selectedCategory));

    // 2. 검색어 조건 확인 (제목이나 태그에 검색어가 포함되어 있는지)
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // 둘 다 만족해야 보여줌
    return categoryMatch && searchMatch;
  });

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '40px' }}>
      
      <header style={{ background: 'white', borderBottom: '1px solid #eee', padding: '20px 0', marginBottom: '30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', margin: 0, color: '#333' }}>🧺 QuickPick</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#888' }}>고민 없는 3줄 요약 쇼핑</p>
          </div>
          <div style={{ background: '#e3f2fd', padding: '10px 20px', borderRadius: '20px', color: '#1565c0', fontSize: '0.9rem', fontWeight: 'bold' }}>
            👼 후원 예정: <span style={{ fontSize: '1.2rem', color: '#0d47a1' }}>152,000원</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 컨트롤 타워: 검색창 + 카테고리 버튼 */}
        <div style={{ marginBottom: '40px' }}>
          
          {/* 🔍 검색창 디자인 */}
          <input 
            type="text" 
            placeholder="찾고 싶은 물건이 있나요? (예: 마라탕, 드라이기)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '15px 20px',
              fontSize: '1rem',
              border: '2px solid #ddd',
              borderRadius: '30px',
              marginBottom: '20px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            // 포커스 되었을 때 파란 테두리 효과 (인라인 스타일로는 한계가 있어 기본만 적용)
          />

          {/* 카테고리 버튼들 */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s',
                  backgroundColor: selectedCategory === category ? '#333' : 'white', // 색상 변경 (검정/흰색)
                  color: selectedCategory === category ? 'white' : '#555',
                  border: selectedCategory === category ? 'none' : '1px solid #ddd'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 결과 보여주기 */}
        <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>
          {searchTerm ? `'${searchTerm}' 검색 결과` : (selectedCategory === '전체' ? '🔥 전체 리뷰 목록' : `🔍 ${selectedCategory} 관련 리뷰`)}
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
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#999' }}>
              <p style={{ fontSize: '3rem', margin: '0 0 10px 0' }}>🕵️‍♀️</p>
              <p>원하시는 결과가 없네요.<br/>검색어나 카테고리를 바꿔보세요!</p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}