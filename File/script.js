// Dark Mode Toggle Functionality
const darkModeBtn = document.getElementById('darkModeBtn');

// Check if dark mode is enabled in local storage
const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add('dark-mode');
}

// Dark Mode Button Click Event
darkModeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
});

// Fetch Ongoing Matches from the API
async function fetchOngoingMatches() {
    try {
        const response = await fetch('/api/ongoing-matches'); // Replace with your actual API endpoint
        const data = await response.json();
        updateOngoingMatches(data);
    } catch (error) {
        console.error("Error fetching ongoing matches:", error);
    }
}

// Fetch Upcoming Matches from the API
async function fetchUpcomingMatches() {
    try {
        const response = await fetch('/api/upcoming-matches'); // Replace with your actual API endpoint
        const data = await response.json();
        updateUpcomingMatches(data);
    } catch (error) {
        console.error("Error fetching upcoming matches:", error);
    }
}

// Fetch Live Scores from the API
async function fetchLiveScores() {
    try {
        const response = await fetch('/api/live-scores'); // Replace with your actual API endpoint
        const data = await response.json();
        updateLiveScores(data);
    } catch (error) {
        console.error("Error fetching live scores:", error);
    }
}

// Fetch Trading Odds from the API
async function fetchTradingOdds() {
    try {
        const response = await fetch('/api/odds'); // Replace with your actual API endpoint
        const data = await response.json();
        updateTradingOdds(data);
    } catch (error) {
        console.error("Error fetching trading odds:", error);
    }
}

// Function to Update Ongoing Matches
function updateOngoingMatches(matches) {
    const ongoingMatchesList = document.getElementById('ongoingMatchesList');
    ongoingMatchesList.innerHTML = '';

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match-item');
        matchElement.innerHTML = `
            <p><strong>${match.team1} vs ${match.team2}</strong></p>
            <p>Status: ${match.status}</p>
            <p>Score: ${match.score}</p>
        `;
        ongoingMatchesList.appendChild(matchElement);
    });
}

// Function to Update Upcoming Matches
function updateUpcomingMatches(matches) {
    const upcomingMatchesList = document.getElementById('upcomingMatchesList');
    upcomingMatchesList.innerHTML = '';

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match-item');
        matchElement.innerHTML = `
            <p><strong>${match.team1} vs ${match.team2}</strong></p>
            <p>Scheduled: ${match.time}</p>
        `;
        upcomingMatchesList.appendChild(matchElement);
    });
}

// Function to Update Live Scores
function updateLiveScores(scores) {
    const liveScores = document.getElementById('liveScores');
    liveScores.innerHTML = `
        <p><strong>Live Score:</strong> ${scores.team1}: ${scores.team1Score} | ${scores.team2}: ${scores.team2Score}</p>
        <p>Status: ${scores.matchStatus}</p>
    `;
}

// Function to Update Trading Odds
function updateTradingOdds(oddsData) {
    const oddsInfo = `
        <p><strong>${oddsData.team1}</strong> - Odds: ${oddsData.odds[oddsData.team1]}</p>
        <p><strong>${oddsData.team2}</strong> - Odds: ${oddsData.odds[oddsData.team2]}</p>
    `;
    document.getElementById('teamOdds').innerHTML = oddsInfo;
}

// Function to Initialize API Calls on Page Load
window.addEventListener("load", () => {
    fetchOngoingMatches();  // Fetch ongoing matches data
    fetchUpcomingMatches();  // Fetch upcoming matches data
    fetchLiveScores();  // Fetch live scores data
    fetchTradingOdds();  // Fetch trading odds data
});
