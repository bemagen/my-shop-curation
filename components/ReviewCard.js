import styles from './ReviewCard.module.css';

export default function ReviewCard({ review }) {
  // 1. 비디오 ID가 없으면 에러를 막기 위해 빈 문자열 처리
  const videoId = review.videoId || ""; 
  
  // 2. 썸네일 주소 생성
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` 
    : "https://via.placeholder.com/320x180?text=No+Image"; // 이미지가 없을 때 회색 박스

  // 3. 유튜브 영상 링크 생성
  const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    // 4. 카드 전체를 <a> 태그(링크)로 감싸서 클릭되게 만듦
    <a 
      href={youtubeLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          {/* 이미지가 있으면 보여주고, 없으면 로딩 중 표시 */}
          {videoId ? (
            <img 
              src={thumbnailUrl} 
              alt={review.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <span>이미지 없음</span>
          )}
          <div className={styles.playIcon}>▶</div>
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{review.title}</h3>
          
          <div className={styles.tags}>
            {review.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.summaryBox}>
            <p>👍 <span style={{color:'#2ecc71', fontWeight:'bold'}}>장점:</span> {review.summary.good}</p>
            <p>👎 <span style={{color:'#e74c3c', fontWeight:'bold'}}>단점:</span> {review.summary.bad}</p>
            <div className={styles.verdict}>
              🏁 {review.summary.verdict}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}