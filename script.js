// 운세 마법사 메인 스크립트 

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('fortune-form');
  const resultBox = document.getElementById('result');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const birth = document.getElementById('birth').value;
    if (!name || !birth) {
      resultBox.textContent = '이름과 생년월일을 모두 입력해주세요.';
      return;
    }
    resultBox.textContent = '운세를 불러오는 중...';

    // Gemini API 연동 예시 (실제 배포시 보안상 별도 프록시 서버 필요)
    try {
      const prompt = `${name}(${birth})의 오늘의 운세를 재미있고 긍정적으로 3~4줄로 알려줘.`;
      // 실제 API 키와 엔드포인트는 별도 환경변수/프록시 서버에서 관리 필요
      const apiKey = 'YOUR_GEMINI_API_KEY'; // 실제 배포시 노출 금지!
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '운세 결과를 받아오지 못했습니다.';
      resultBox.textContent = geminiText;
    } catch (err) {
      resultBox.textContent = '운세 결과를 받아오는 중 오류가 발생했습니다.';
    }
  });
}); 