// 운세 마법사 메인 스크립트 

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('fortune-form');
  const resultBox = document.getElementById('result');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const birth = document.getElementById('birth').value;
    if (!name || !birth) {
      resultBox.textContent = '이름과 생년월일을 모두 입력해주세요.';
      return;
    }
    // 임시 운세 메시지
    resultBox.textContent = `${name}님(${birth})의 오늘의 운세는...\n\n✨ 좋은 일이 생길 예감! 긍정적인 마음으로 하루를 시작해보세요.`;
  });
}); 