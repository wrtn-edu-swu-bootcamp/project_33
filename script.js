// 전역 변수
let selectedBuilding = null;
let selectedDay = null;
let selectedBlock = null;

// 데이터 (JSON 파일 대신 직접 포함)
const roomsData = {
  "timeBlocks": [
    { "id": 1, "name": "1-2교시", "time": "09:00-12:00" },
    { "id": 2, "name": "3-4교시", "time": "12:00-15:00" },
    { "id": 3, "name": "5-6교시", "time": "15:00-18:00" }
  ],
  "buildings": {
    "50주년": {
      "name": "50주년 기념관",
      "floors": [1, 2, 3, 4, 5, 6],
      "rooms": [
        { "id": "101", "name": "50주년 기념관 101호", "capacity": 40, "facilities": ["빔프로젝터", "화이트보드"], "floor": 1, "schedule": { "월": [1], "화": [2], "수": [], "목": [3], "금": [1] } },
        { "id": "102", "name": "50주년 기념관 102호", "capacity": 35, "facilities": ["화이트보드"], "floor": 1, "schedule": { "월": [2], "화": [], "수": [1], "목": [], "금": [2] } },
        { "id": "201", "name": "50주년 기념관 201호", "capacity": 50, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 2, "schedule": { "월": [], "화": [1, 3], "수": [2], "목": [1], "금": [] } },
        { "id": "202", "name": "50주년 기념관 202호", "capacity": 45, "facilities": ["빔프로젝터", "컴퓨터"], "floor": 2, "schedule": { "월": [3], "화": [], "수": [3], "목": [2], "금": [3] } },
        { "id": "301", "name": "50주년 기념관 301호", "capacity": 30, "facilities": ["화이트보드", "컴퓨터"], "floor": 3, "schedule": { "월": [1, 2], "화": [2], "수": [], "목": [], "금": [1, 2] } },
        { "id": "302", "name": "50주년 기념관 302호", "capacity": 38, "facilities": ["빔프로젝터", "화이트보드"], "floor": 3, "schedule": { "월": [], "화": [3], "수": [1, 2], "목": [3], "금": [] } },
        { "id": "401", "name": "50주년 기념관 401호", "capacity": 42, "facilities": ["빔프로젝터", "화이트보드"], "floor": 4, "schedule": { "월": [2, 3], "화": [1], "수": [], "목": [1, 2], "금": [2] } },
        { "id": "402", "name": "50주년 기념관 402호", "capacity": 48, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드"], "floor": 4, "schedule": { "월": [], "화": [], "수": [2, 3], "목": [], "금": [3] } },
        { "id": "501", "name": "50주년 기념관 501호", "capacity": 55, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 5, "schedule": { "월": [1], "화": [2, 3], "수": [1], "목": [2], "금": [1, 3] } },
        { "id": "502", "name": "50주년 기념관 502호", "capacity": 32, "facilities": ["화이트보드"], "floor": 5, "schedule": { "월": [3], "화": [], "수": [], "목": [1, 3], "금": [] } },
        { "id": "601", "name": "50주년 기념관 601호", "capacity": 60, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드", "마이크"], "floor": 6, "schedule": { "월": [2], "화": [1], "수": [3], "목": [], "금": [2, 3] } },
        { "id": "602", "name": "50주년 기념관 602호", "capacity": 28, "facilities": ["화이트보드", "컴퓨터"], "floor": 6, "schedule": { "월": [], "화": [3], "수": [1, 2], "목": [3], "금": [1] } }
      ]
    },
    "제1과학관": {
      "name": "제1과학관",
      "floors": [1, 2, 3, 4, 5, 6],
      "rooms": [
        { "id": "101", "name": "제1과학관 101호", "capacity": 35, "facilities": ["빔프로젝터", "화이트보드"], "floor": 1, "schedule": { "월": [2], "화": [1], "수": [3], "목": [], "금": [2] } },
        { "id": "102", "name": "제1과학관 102호", "capacity": 40, "facilities": ["빔프로젝터", "컴퓨터"], "floor": 1, "schedule": { "월": [], "화": [3], "수": [1], "목": [2], "금": [] } },
        { "id": "201", "name": "제1과학관 201호", "capacity": 45, "facilities": ["빔프로젝터", "화이트보드", "컴퓨터"], "floor": 2, "schedule": { "월": [1, 3], "화": [], "수": [], "목": [1], "금": [3] } },
        { "id": "202", "name": "제1과학관 202호", "capacity": 38, "facilities": ["화이트보드"], "floor": 2, "schedule": { "월": [], "화": [2], "수": [2, 3], "목": [3], "금": [1] } },
        { "id": "301", "name": "제1과학관 301호", "capacity": 50, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 3, "schedule": { "월": [2], "화": [1, 3], "수": [1], "목": [], "금": [2, 3] } },
        { "id": "302", "name": "제1과학관 302호", "capacity": 30, "facilities": ["화이트보드", "컴퓨터"], "floor": 3, "schedule": { "월": [1], "화": [], "수": [], "목": [2, 3], "금": [] } },
        { "id": "401", "name": "제1과학관 401호", "capacity": 42, "facilities": ["빔프로젝터", "화이트보드"], "floor": 4, "schedule": { "월": [3], "화": [2], "수": [2], "목": [1], "금": [1] } },
        { "id": "402", "name": "제1과학관 402호", "capacity": 48, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드"], "floor": 4, "schedule": { "월": [], "화": [], "수": [3], "목": [], "금": [2, 3] } },
        { "id": "501", "name": "제1과학관 501호", "capacity": 55, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 5, "schedule": { "월": [1, 2], "화": [3], "수": [], "목": [2], "금": [1] } },
        { "id": "502", "name": "제1과학관 502호", "capacity": 33, "facilities": ["화이트보드"], "floor": 5, "schedule": { "월": [], "화": [1], "수": [1, 3], "목": [3], "금": [] } },
        { "id": "601", "name": "제1과학관 601호", "capacity": 60, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드", "마이크"], "floor": 6, "schedule": { "월": [3], "화": [2], "수": [2], "목": [1], "금": [3] } },
        { "id": "602", "name": "제1과학관 602호", "capacity": 28, "facilities": ["화이트보드", "컴퓨터"], "floor": 6, "schedule": { "월": [2], "화": [], "수": [], "목": [], "금": [1, 2] } }
      ]
    },
    "제2과학관": {
      "name": "제2과학관",
      "floors": [-1, 1, 2, 3, 4, 5],
      "rooms": [
        { "id": "B101", "name": "제2과학관 B101호", "capacity": 30, "facilities": ["빔프로젝터", "화이트보드"], "floor": -1, "schedule": { "월": [1, 3], "화": [2], "수": [], "목": [1, 2], "금": [3] } },
        { "id": "B102", "name": "제2과학관 B102호", "capacity": 35, "facilities": ["화이트보드", "컴퓨터"], "floor": -1, "schedule": { "월": [], "화": [1, 3], "수": [2], "목": [], "금": [1, 2] } },
        { "id": "101", "name": "제2과학관 101호", "capacity": 40, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드"], "floor": 1, "schedule": { "월": [2], "화": [], "수": [1, 3], "목": [3], "금": [] } },
        { "id": "102", "name": "제2과학관 102호", "capacity": 25, "facilities": ["화이트보드"], "floor": 1, "schedule": { "월": [], "화": [2, 3], "수": [], "목": [1], "금": [2, 3] } },
        { "id": "201", "name": "제2과학관 201호", "capacity": 50, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드", "마이크"], "floor": 2, "schedule": { "월": [1, 2], "화": [], "수": [3], "목": [2], "금": [1, 3] } },
        { "id": "202", "name": "제2과학관 202호", "capacity": 35, "facilities": ["빔프로젝터", "화이트보드"], "floor": 2, "schedule": { "월": [3], "화": [1], "수": [2, 3], "목": [], "금": [2] } },
        { "id": "301", "name": "제2과학관 301호", "capacity": 30, "facilities": ["빔프로젝터", "화이트보드"], "floor": 3, "schedule": { "월": [1, 3], "화": [2], "수": [], "목": [1, 2], "금": [3] } },
        { "id": "302", "name": "제2과학관 302호", "capacity": 40, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드"], "floor": 3, "schedule": { "월": [2], "화": [1, 3], "수": [2], "목": [], "금": [1, 2] } },
        { "id": "401", "name": "제2과학관 401호", "capacity": 50, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드", "마이크"], "floor": 4, "schedule": { "월": [1, 2], "화": [], "수": [3], "목": [2], "금": [1, 3] } },
        { "id": "402", "name": "제2과학관 402호", "capacity": 35, "facilities": ["빔프로젝터", "화이트보드"], "floor": 4, "schedule": { "월": [3], "화": [1], "수": [2, 3], "목": [], "금": [2] } },
        { "id": "501", "name": "제2과학관 501호", "capacity": 60, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드", "마이크"], "floor": 5, "schedule": { "월": [1], "화": [2, 3], "수": [], "목": [2, 3], "금": [1] } },
        { "id": "502", "name": "제2과학관 502호", "capacity": 30, "facilities": ["빔프로젝터", "화이트보드"], "floor": 5, "schedule": { "월": [], "화": [1], "수": [1, 3], "목": [], "금": [2, 3] } }
      ]
    },
    "인문사회관": {
      "name": "인문사회관",
      "floors": [1, 2, 3, 4, 5, 6],
      "rooms": [
        { "id": "101", "name": "인문사회관 101호", "capacity": 38, "facilities": ["빔프로젝터", "화이트보드"], "floor": 1, "schedule": { "월": [1], "화": [], "수": [2], "목": [3], "금": [1, 2] } },
        { "id": "102", "name": "인문사회관 102호", "capacity": 42, "facilities": ["화이트보드"], "floor": 1, "schedule": { "월": [2, 3], "화": [1], "수": [], "목": [1], "금": [] } },
        { "id": "201", "name": "인문사회관 201호", "capacity": 45, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 2, "schedule": { "월": [], "화": [2, 3], "수": [1], "목": [2], "금": [3] } },
        { "id": "202", "name": "인문사회관 202호", "capacity": 40, "facilities": ["빔프로젝터", "화이트보드"], "floor": 2, "schedule": { "월": [3], "화": [], "수": [3], "목": [], "금": [1, 2] } },
        { "id": "301", "name": "인문사회관 301호", "capacity": 35, "facilities": ["화이트보드", "컴퓨터"], "floor": 3, "schedule": { "월": [1, 2], "화": [1], "수": [], "목": [2, 3], "금": [] } },
        { "id": "302", "name": "인문사회관 302호", "capacity": 50, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 3, "schedule": { "월": [], "화": [3], "수": [2, 3], "목": [], "금": [3] } },
        { "id": "401", "name": "인문사회관 401호", "capacity": 48, "facilities": ["빔프로젝터", "화이트보드"], "floor": 4, "schedule": { "월": [2], "화": [], "수": [1], "목": [1, 3], "금": [2] } },
        { "id": "402", "name": "인문사회관 402호", "capacity": 32, "facilities": ["화이트보드"], "floor": 4, "schedule": { "월": [3], "화": [2], "수": [], "목": [], "금": [1, 3] } },
        { "id": "501", "name": "인문사회관 501호", "capacity": 55, "facilities": ["빔프로젝터", "컴퓨터", "화이트보드", "마이크"], "floor": 5, "schedule": { "월": [1], "화": [1, 3], "수": [3], "목": [2], "금": [] } },
        { "id": "502", "name": "인문사회관 502호", "capacity": 30, "facilities": ["화이트보드"], "floor": 5, "schedule": { "월": [], "화": [], "수": [1, 2], "목": [], "금": [2, 3] } },
        { "id": "601", "name": "인문사회관 601호", "capacity": 60, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 6, "schedule": { "월": [2, 3], "화": [2], "수": [], "목": [1], "금": [1] } },
        { "id": "602", "name": "인문사회관 602호", "capacity": 28, "facilities": ["화이트보드", "컴퓨터"], "floor": 6, "schedule": { "월": [], "화": [], "수": [2, 3], "목": [3], "금": [] } }
      ]
    },
    "예술관": {
      "name": "예술관",
      "floors": [1, 2, 3, 4, 5, 6],
      "rooms": [
        { "id": "101", "name": "예술관 101호", "capacity": 40, "facilities": ["빔프로젝터", "화이트보드", "음향시설"], "floor": 1, "schedule": { "월": [2], "화": [1], "수": [], "목": [2, 3], "금": [1] } },
        { "id": "102", "name": "예술관 102호", "capacity": 35, "facilities": ["빔프로젝터", "화이트보드"], "floor": 1, "schedule": { "월": [], "화": [3], "수": [1, 2], "목": [], "금": [3] } },
        { "id": "201", "name": "예술관 201호", "capacity": 50, "facilities": ["빔프로젝터", "화이트보드", "마이크", "음향시설"], "floor": 2, "schedule": { "월": [1, 3], "화": [], "수": [3], "목": [1], "금": [2] } },
        { "id": "202", "name": "예술관 202호", "capacity": 45, "facilities": ["빔프로젝터", "화이트보드"], "floor": 2, "schedule": { "월": [], "화": [2], "수": [], "목": [], "금": [1, 3] } },
        { "id": "301", "name": "예술관 301호", "capacity": 38, "facilities": ["화이트보드", "음향시설"], "floor": 3, "schedule": { "월": [2, 3], "화": [1, 3], "수": [2], "목": [3], "금": [] } },
        { "id": "302", "name": "예술관 302호", "capacity": 42, "facilities": ["빔프로젝터", "화이트보드"], "floor": 3, "schedule": { "월": [1], "화": [], "수": [1], "목": [2], "금": [2, 3] } },
        { "id": "401", "name": "예술관 401호", "capacity": 55, "facilities": ["빔프로젝터", "화이트보드", "마이크", "음향시설"], "floor": 4, "schedule": { "월": [], "화": [2, 3], "수": [], "목": [1], "금": [1] } },
        { "id": "402", "name": "예술관 402호", "capacity": 32, "facilities": ["화이트보드"], "floor": 4, "schedule": { "월": [3], "화": [], "수": [2, 3], "목": [], "금": [2] } },
        { "id": "501", "name": "예술관 501호", "capacity": 60, "facilities": ["빔프로젝터", "화이트보드", "마이크", "음향시설"], "floor": 5, "schedule": { "월": [1, 2], "화": [1], "수": [1], "목": [2, 3], "금": [] } },
        { "id": "502", "name": "예술관 502호", "capacity": 30, "facilities": ["화이트보드", "음향시설"], "floor": 5, "schedule": { "월": [], "화": [], "수": [], "목": [], "금": [1, 2, 3] } },
        { "id": "601", "name": "예술관 601호", "capacity": 48, "facilities": ["빔프로젝터", "화이트보드", "마이크"], "floor": 6, "schedule": { "월": [3], "화": [2, 3], "수": [3], "목": [1], "금": [3] } },
        { "id": "602", "name": "예술관 602호", "capacity": 28, "facilities": ["화이트보드"], "floor": 6, "schedule": { "월": [2], "화": [], "수": [2], "목": [], "금": [] } }
      ]
    }
  }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('데이터 로드 완료:', roomsData);
    initializeEventListeners();
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 건물 버튼 클릭
    const buildingButtons = document.querySelectorAll('.building-btn');
    buildingButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 이전 선택 제거
            buildingButtons.forEach(b => b.classList.remove('active'));
            // 현재 버튼 활성화
            btn.classList.add('active');
            selectedBuilding = btn.dataset.building;
            checkSearchReady();
        });
    });

    // 요일 버튼 클릭
    const dayButtons = document.querySelectorAll('.day-btn');
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 이전 선택 제거
            dayButtons.forEach(b => b.classList.remove('active'));
            // 현재 버튼 활성화
            btn.classList.add('active');
            selectedDay = btn.dataset.day;
            checkSearchReady();
        });
    });

    // 시간 버튼 클릭
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 이전 선택 제거
            timeButtons.forEach(b => b.classList.remove('active'));
            // 현재 버튼 활성화
            btn.classList.add('active');
            selectedBlock = parseInt(btn.dataset.block);
            checkSearchReady();
        });
    });

    // 검색 버튼 클릭
    document.getElementById('searchBtn').addEventListener('click', performSearch);
}

// 검색 준비 상태 확인
function checkSearchReady() {
    const searchBtn = document.getElementById('searchBtn');
    if (selectedBuilding && selectedDay && selectedBlock) {
        searchBtn.disabled = false;
    } else {
        searchBtn.disabled = true;
    }
}

// 검색 수행
function performSearch() {
    if (!selectedBuilding || !selectedDay || !selectedBlock || !roomsData) {
        return;
    }

    // 선택된 건물의 강의실 가져오기
    const buildingData = roomsData.buildings[selectedBuilding];
    if (!buildingData) {
        console.error('건물 데이터를 찾을 수 없습니다:', selectedBuilding);
        return;
    }

    // 빈 교실 찾기
    const emptyRooms = buildingData.rooms.filter(room => {
        const schedule = room.schedule[selectedDay] || [];
        return !schedule.includes(selectedBlock);
    });

    // 결과 표시
    displayResults(emptyRooms, buildingData.name);
}

// 결과 표시
function displayResults(rooms, buildingName) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');
    const searchInfo = document.getElementById('searchInfo');
    const emptyState = document.getElementById('emptyState');

    // 검색 정보 업데이트
    const blockInfo = roomsData.timeBlocks.find(b => b.id === selectedBlock);
    searchInfo.textContent = `${buildingName} | ${selectedDay}요일 ${blockInfo.name} (${blockInfo.time}) - ${rooms.length}개의 빈 교실`;

    if (rooms.length === 0) {
        // 결과 없음
        resultsSection.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        // 결과 있음
        emptyState.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // 결과 카드 생성
        resultsContainer.innerHTML = '';
        rooms.forEach(room => {
            const card = createRoomCard(room);
            resultsContainer.appendChild(card);
        });

        // 결과 섹션으로 스크롤
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 교실 카드 생성
function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = 'room-card';

    // 시설 태그 생성
    const facilitiesTags = room.facilities.map(facility => 
        `<span class="facility-tag">${facility}</span>`
    ).join('');

    // 층 표시 처리 (지하층 고려)
    const floorText = room.floor === -1 ? 'B1층' : `${room.floor}층`;

    card.innerHTML = `
        <div class="room-header">
            <h3 class="room-name">${room.name}</h3>
        </div>
        <p class="room-floor">📍 ${floorText}</p>
        <div class="room-facilities">
            ${facilitiesTags}
        </div>
    `;

    return card;
}
