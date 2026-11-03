// 가격 실시간 계산 로직
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculatorForm');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');

  function calculateTotal() {
    let total = 0;

    // 메인 세트 (Radio)
    const selectedRadio = form.querySelector('input[name="mainSet"]:checked');
    if (selectedRadio) {
      total += parseInt(selectedRadio.value);
    }

    // 추가 옵션 (Checkbox)
    const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');
    checkedBoxes.forEach(box => {
      total += parseInt(box.value);
    });

    // 천단위 콤마 생성
    totalPriceDisplay.textContent = total.toLocaleString() + ' 원';
  }

  form.addEventListener('change', calculateTotal);
});

// 선택한 옵션 견적 요약 복사 (iframe 호환 버전)
function copyOrderSummary() {
  const form = document.getElementById('calculatorForm');
  const selectedRadio = form.querySelector('input[name="mainSet"]:checked');
  const checkedBoxes = form.querySelectorAll('input[type="checkbox"]:checked');
  const totalPrice = document.getElementById('totalPriceDisplay').textContent;

  if (!selectedRadio && checkedBoxes.length === 0) {
    alert('선택된 옵션이 없습니다.');
    return;
  }

  let text = `[ 유칼 작가 커미션 견적 요약 ]\n`;
  if (selectedRadio) {
    text += `- 오마카세 ${selectedRadio.dataset.name} (+100,000원)\n`;
  }
  if (checkedBoxes.length > 0) {
    text += `- 추가 옵션:\n`;
    checkedBoxes.forEach(box => {
      text += `  * ${box.dataset.name} (+${parseInt(box.value).toLocaleString()}원)\n`;
    });
  }
  text += `------------------------\n총 예상 금액: ${totalPrice}`;

  // 임시 textarea를 생성하여 클립보드 복사 (iframe 환경 우회)
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('선택하신 견적 요약이 클립보드에 복사되었습니다!');
    } else {
      alert('복사에 실패했습니다. 직접 드래그해서 복사해주세요.');
    }
  } catch (err) {
    console.error('클립보드 복사 오류:', err);
    alert('이 브라우저 환경에서는 자동 복사가 지원되지 않습니다.');
  }

  document.body.removeChild(textarea);
}

// 포트폴리오 필터링 기능
function filterPortfolio(category, element) {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  const items = document.querySelectorAll('.pf-item');
  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 신청서 양식 복사 기능 (대체 호환 코드)
function copyApplicationForm() {
  const set = document.getElementById('f_set').value || '(미입력)';
  const ch = document.getElementById('f_ch').value || '(미입력)';
  const concept = document.getElementById('f_concept').value || '(미입력)';
  const parts = document.getElementById('f_parts').value || '(미입력)';
  const qa = document.getElementById('f_qa').value || '(미입력)';
  const formText = `[ 유칼 작가 3D 커미션 신청서 ]
1. 방송 활동명 / 방송 링크: ${set}
2. 컨셉 및 참고 이미지 설명: ${ch}
3. 필요한 요소 설명: ${concept}
4. 채팅창 모양: ${parts}
5. 기타 요청 및 질문: ${qa}
----------------------------------------`;

  // 임시 textarea 요소를 생성하여 복사 수행 (file:// 환경 우회)
  const textarea = document.createElement('textarea');
  textarea.value = formText;
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('작성하신 신청서 내용이 클립보드에 복사되었습니다.');
    } else {
      alert('복사에 실패했습니다. 직접 드래그해서 복사해주세요.');
    }
  } catch (err) {
    console.error('클립보드 복사 오류:', err);
    alert('이 브라우저 환경에서는 자동 복사가 지원되지 않습니다.');
  }
  
  document.body.removeChild(textarea);
}

// ==========================================
// 라이트박스 팝업 제어 로직
// ==========================================
function openModal(cardElement) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  // 카드 내부 요소 추출
  const img = cardElement.querySelector('.pf-img-box img');
  const title = cardElement.querySelector('.pf-title');
  const desc = cardElement.querySelector('.pf-desc');

  if (img) modalImg.src = img.src;
  if (title) modalTitle.textContent = title.textContent;
  if (desc) modalDesc.textContent = desc.textContent;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

function closeModal(event) {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; // 스크롤 원복
}

// Esc 키 입력 시 팝업 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// FAQ 아코디언 토글
function toggleFaq(element) {
  const parent = element.parentElement;
  parent.classList.toggle('open');
}