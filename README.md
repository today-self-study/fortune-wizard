# 운세 마법사 (Fortune Wizard)

순수 JavaScript, HTML, CSS로 만든 운세 웹사이트입니다.

## 주요 기능
- 생년월일, 이름 입력
- Gemini API를 통한 운세 결과 출력
- 심플하고 세련된 UI
- GitHub Pages로 배포

---

## 사용법
1. 이름과 생년월일을 입력합니다.
2. '운세 보기' 버튼을 누르면 Gemini API를 통해 오늘의 운세가 출력됩니다.

## 개발 및 배포 방법

### 1. 개발 환경
- index.html, style.css, script.js만으로 동작
- 별도의 빌드 과정 없이 바로 실행 가능

### 2. Gemini API 키 관리
- script.js 내 API 키는 반드시 실제 배포시 노출되지 않도록 주의하세요.
- 보안을 위해 프록시 서버를 별도로 두는 것을 권장합니다.

### 3. GitHub Pages 배포
- main 브랜치 루트에 index.html이 위치하면 바로 배포 가능
- GitHub 저장소의 Settings > Pages에서 main 브랜치(root) 선택
- 저장 후, 제공된 URL로 접속하면 사이트 확인 가능

---

## 라이선스
MIT 