// 운세 마법사 메인 스크립트

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("fortune-form");
  const resultBox = document.getElementById("result");

  // 생년월일 select box 동적 생성
  const yearSelect = document.getElementById("birth-year");
  const monthSelect = document.getElementById("birth-month");
  const daySelect = document.getElementById("birth-day");
  const now = new Date();
  const thisYear = now.getFullYear();
  for (let y = thisYear; y >= 1900; y--) {
    yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
  }
  for (let m = 1; m <= 12; m++) {
    monthSelect.innerHTML += `<option value="${String(m).padStart(
      2,
      "0"
    )}">${m}</option>`;
  }
  function updateDays() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    const daysInMonth = new Date(year, month, 0).getDate();
    daySelect.innerHTML = "";
    for (let d = 1; d <= daysInMonth; d++) {
      daySelect.innerHTML += `<option value="${String(d).padStart(
        2,
        "0"
      )}">${d}</option>`;
    }
  }
  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);
  // 최초 로드시 일수 채우기
  yearSelect.value = thisYear;
  monthSelect.value = "01";
  updateDays();

  // 긍정적 이모지 리스트
  const emojis = ["✨", "🌈", "😃", "🦄", "🍀", "🌟", "🧚‍♀️", "🪄", "☀️", "💫"];

  function showResult(text) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    resultBox.innerHTML = `<span class="result-emoji">${emoji}</span><span>${text}</span>`;
    resultBox.classList.remove("show");
    // 애니메이션 트리거
    setTimeout(() => resultBox.classList.add("show"), 10);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const year = yearSelect.value;
    const month = monthSelect.value;
    const day = daySelect.value;
    if (!name || !year || !month || !day) {
      showResult("이름과 생년월일을 모두 입력해주세요.");
      return;
    }
    const birth = `${year}-${month}-${day}`;
    showResult("운세를 불러오는 중...");

    // Gemini API 연동 예시 (실제 배포시 보안상 별도 프록시 서버 필요)
    try {
      const prompt = `
		너는 전통 한국 운세 마법사야.
		너는 사람들의 이름과 생년월일을 받아서 그 사람의 오늘의 운세를 알려줘.
	  	 - 이름: ${name}
		 - 생년월일: ${birth}
		 - 오늘 날짜: ${new Date().toLocaleDateString("ko-KR")}
		
		유의사항:
		 - 운세를 알려줄 때, 강조나 특별한 표시는 하지 말고, 순수 Text로 결과를 알려줘.
		`.trim();
      // 실제 API 키와 엔드포인트는 별도 환경변수/프록시 서버에서 관리 필요
      const apiKey = "AIzaSyBsTJS9sDegG9G0XFHDgAHA8UB7vykzD48"; // 실제 배포시 노출 금지!
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          apiKey,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await response.json();
      const geminiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "운세 결과를 받아오지 못했습니다.";
      showResult(geminiText);
    } catch (err) {
      showResult("운세 결과를 받아오는 중 오류가 발생했습니다.");
    }
  });
});
