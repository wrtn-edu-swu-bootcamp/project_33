// 전역 변수
let selectedBuilding = null;
let selectedDay = null;
let selectedBlock = null;

// 강의실 데이터 생성 함수
function generateRoomData() {
  const facilities = [
    ["빔프로젝터", "화이트보드"],
    ["화이트보드"],
    ["빔프로젝터", "화이트보드", "마이크"],
    ["빔프로젝터", "컴퓨터"],
    ["화이트보드", "컴퓨터"],
    ["빔프로젝터", "화이트보드", "컴퓨터"],
    ["빔프로젝터", "마이크"],
    ["컴퓨터"],
    ["음향시설"],
    ["빔프로젝터", "음향시설"],
    ["화이트보드", "음향시설"],
    ["빔프로젝터", "화이트보드", "마이크", "음향시설"]
  ];

  const buildingConfig = {
    "50주년": { name: "50주년 기념관", count: 59, floors: [2, 3, 4, 5, 6] },
    "인문사회관": { name: "인문사회관", count: 46, floors: [1, 2, 3, 4, 5, 6] },
    "조형예술관": { name: "조형예술관", count: 24, floors: [1, 2, 3, 4, 5, 6] },
    "제1과학관": { name: "제1과학관", count: 22, floors: [1, 2, 3, 4, 5, 6] },
    "제2과학관": { name: "제2과학관", count: 24, floors: [-1, 1, 2, 3, 4, 5] }
  };

  const buildings = {};
  let roomId = 1;

  for (const [key, config] of Object.entries(buildingConfig)) {
    const rooms = [];
    let roomCount = 0;

    for (const floor of config.floors) {
      if (roomCount >= config.count) break;
      
      const roomsPerFloor = Math.ceil(config.count / config.floors.length);
      
      for (let i = 1; i <= roomsPerFloor && roomCount < config.count; i++) {
        const roomNumber = Math.abs(floor) * 100 + i;
        const roomName = floor === -1 ? `B${String(i).padStart(2, '0')}호` : `${roomNumber}호`;
        
        const capacity = 20 + Math.floor(Math.random() * 40);
        const facilitySet = facilities[Math.floor(Math.random() * facilities.length)];
        
        const schedule = {
          "월": [],
          "화": [],
          "수": [],
          "목": [],
          "금": []
        };
        
        for (const day in schedule) {
          const numClasses = Math.floor(Math.random() * 5);
          for (let j = 0; j < numClasses; j++) {
            const classTime = Math.floor(Math.random() * 6) + 1;
            if (!schedule[day].includes(classTime)) {
              schedule[day].push(classTime);
            }
          }
          schedule[day].sort((a, b) => a - b);
        }
        
        rooms.push({
          id: String(roomId++),
          name: `${config.name} ${roomName}`,
          capacity: capacity,
          facilities: facilitySet,
          floor: floor,
          schedule: schedule
        });
        
        roomCount++;
      }
    }
    
    buildings[key] = {
      name: config.name,
      floors: config.floors,
      rooms: rooms
    };
  }
  
  return buildings;
}

// 데이터 (JSON 파일 대신 직접 포함)
const roomsData = {
  "timeBlocks": [
    { "id": 1, "name": "1교시", "time": "09:00-10:00" },
    { "id": 2, "name": "2교시", "time": "10:00-11:00" },
    { "id": 3, "name": "3교시", "time": "11:00-12:00" },
    { "id": 4, "name": "4교시", "time": "12:00-13:00" },
    { "id": 5, "name": "5교시", "time": "13:00-14:00" },
    { "id": 6, "name": "6교시", "time": "14:00-15:00" }
  ],
  "buildings": generateRoomData()
};

// DOM 요소
const buildingBtns = document.querySelectorAll('.building-btn');
const dayBtns = document.querySelectorAll('.day-btn');
const timeBtns = document.querySelectorAll('.time-btn');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const searchInfo = document.getElementById('searchInfo');
const emptyState = document.getElementById('emptyState');

// 버튼 클릭 이벤트 리스너
buildingBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    buildingBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    selectedBuilding = this.dataset.building;
    checkSearchReady();
  });
});

dayBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    dayBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    selectedDay = this.dataset.day;
    checkSearchReady();
  });
});

timeBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    timeBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    selectedBlock = parseInt(this.dataset.block);
    checkSearchReady();
  });
});

searchBtn.addEventListener('click', performSearch);

// 검색 준비 상태 확인
function checkSearchReady() {
  if (selectedBuilding && selectedDay && selectedBlock) {
    searchBtn.disabled = false;
  } else {
    searchBtn.disabled = true;
  }
}

// 검색 수행
function performSearch() {
  const buildingData = roomsData.buildings[selectedBuilding];
  const buildingName = buildingData.name;
  
  const availableRooms = buildingData.rooms.filter(room => {
    const classesOnDay = room.schedule[selectedDay] || [];
    return !classesOnDay.includes(selectedBlock);
  });

  displayResults(availableRooms, buildingName);
}

// 결과 표시
function displayResults(rooms, buildingName) {
  const timeBlockName = roomsData.timeBlocks[selectedBlock - 1].name;
  const timeBlockTime = roomsData.timeBlocks[selectedBlock - 1].time;

  searchInfo.textContent = `${buildingName} | ${selectedDay}요일 ${timeBlockName}(${timeBlockTime})`;
  
  if (rooms.length === 0) {
    resultsSection.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    resultsSection.style.display = 'block';
    resultsContainer.innerHTML = '';
    
    rooms.forEach(room => {
      const roomCard = createRoomCard(room);
      resultsContainer.appendChild(roomCard);
    });
  }
}

// 강의실 카드 생성
function createRoomCard(room) {
  const card = document.createElement('div');
  card.className = 'room-card';
  const facilitiesTags = room.facilities.map(facility => 
    `<span class="facility-tag">${facility}</span>`
  ).join('');
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
