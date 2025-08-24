// fetch= Function used for making HTTP requests to fetch resources.
//        (JSON style data, images, files)
//        Simplifies asynchronous data fetching in JavaScript and
//        used for interacting with APIs to retrieve and send 
//        data asynchronously over the web.
//        fetch(url,{method: "POST(send),PUT(replace),DELETE(remove),GET(retrieve),"})


// Fetch a singular resource (a specific Pokémon by name)
// fetch("https://pokeapi.co/api/v2/pokemon/agumon")
//     .then(response => {

//         if (!response.ok) {
//             throw new Error("Pokemon not found" + response.statusText);
//         }
//         return response.json();

//     })
//     .then(data => console.log(data.types))
//     .catch(error => console.error(error));


// Add event listener for Enter key press
document.addEventListener('DOMContentLoaded', function() {
    const pokemonInput = document.getElementById('pokemonName');
    pokemonInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            fetchData();
        }
    });
});

// Using async/await syntax to fetch a specific Pokémon by name
async function fetchData() {
    try{
        // Get the Pokémon name from an input field
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Pokemon not found" + response.statusText);
        }
        const data = await response.json();

        // Display the Pokémon's sprite image
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const displayDiv = document.getElementById("pokemonDisplay");
        
        imgElement.src = pokemonSprite;
        displayDiv.style.display = "block";

        // Display Pokemon name
        document.getElementById("pokemonNameDisplay").textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        // Display Pokemon types
        const typesDiv = document.getElementById("pokemonTypes");
        const types = data.types.map(type => type.type.name);
        let typesHTML = `
            <table class="bulba-table">
                <tr class="table-header">
                    <th colspan="2">Type</th>
                </tr>
                <tr>
                    <td class="label-cell">Type</td>
                    <td class="data-cell">
                        ${types.map(type => `<span class="type-badge type-${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`).join(' ')}
                    </td>
                </tr>
            </table>
        `;
        typesDiv.innerHTML = typesHTML;

        // Display Pokemon abilities
        const abilitiesDiv = document.getElementById("pokemonAbilities");
        const abilities = data.abilities;
        let abilitiesHTML = `
            <table class="bulba-table">
                <tr class="table-header">
                    <th colspan="2">Abilities</th>
                </tr>
        `;
        abilities.forEach((ability, index) => {
            const abilityType = ability.is_hidden ? 'Hidden Ability' : `Ability ${index + 1}`;
            abilitiesHTML += `
                <tr>
                    <td class="label-cell">${abilityType}</td>
                    <td class="data-cell ability-name">${ability.ability.name.replace('-', ' ')}</td>
                </tr>
            `;
        });
        abilitiesHTML += '</table>';
        abilitiesDiv.innerHTML = abilitiesHTML;

        // Display Pokemon stats
        const statsDiv = document.getElementById("pokemonStats");
        let statsHTML = `
            <table class="bulba-table">
                <tr class="table-header">
                    <th colspan="3">Base Stats</th>
                </tr>
        `;
        data.stats.forEach(stat => {
            const statName = stat.stat.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const statValue = stat.base_stat;
            const barWidth = Math.min((statValue / 255) * 100, 100); // Scale to 255 max
            const statColor = getStatColor(statValue);
            
            statsHTML += `
                <tr>
                    <td class="label-cell">${statName}</td>
                    <td class="stat-value">${statValue}</td>
                    <td class="stat-bar-cell">
                        <div class="stat-bar-container" style="background: linear-gradient(to right, ${statColor} 0%, ${statColor} ${barWidth}%, #e0e0e0 ${barWidth}%, #e0e0e0 100%);"></div>
                    </td>
                </tr>
            `;
        });
        statsHTML += '</table>';
        statsDiv.innerHTML = statsHTML;

        // Display Pokemon moves (initially collapsed)
        const movesDiv = document.getElementById("pokemonMoves");
        const totalMoves = data.moves.length;
        movesDiv.innerHTML = `
            <table class="bulba-table moves-table">
                <tr class="table-header clickable-header">
                    <th colspan="4">Moves (${totalMoves} total) - Click to expand</th>
                </tr>
            </table>
        `;
        movesDiv.style.cursor = "pointer";
        
        // Store moves data for toggle functionality
        movesDiv.movesData = data.moves;
        movesDiv.isExpanded = false;
        
        // Add click event to toggle moves display
        movesDiv.onclick = async function() {
            if (!this.isExpanded) {
                // Show loading message
                this.innerHTML = `
                    <table class="bulba-table moves-table">
                        <tr class="table-header">
                            <th colspan="4">Loading move details...</th>
                        </tr>
                    </table>
                `;
                
                // Show all moves with detailed information
                let movesHTML = `
                    <table class="bulba-table moves-table">
                        <tr class="table-header clickable-header">
                            <th colspan="4">Moves (${totalMoves} total) - Click to collapse</th>
                        </tr>
                `;
                
                // Categorize moves by learning method
                const levelUpMoves = [];
                const tmMoves = [];
                const eggMoves = [];
                const tutorMoves = [];
                const otherMoves = [];
                
                // Sort and categorize moves
                this.movesData.forEach(move => {
                    const moveDetails = move.version_group_details[0] || {};
                    const method = moveDetails.move_learn_method?.name || 'unknown';
                    
                    if (method === 'level-up') {
                        levelUpMoves.push(move);
                    } else if (method === 'machine') {
                        tmMoves.push(move);
                    } else if (method === 'egg') {
                        eggMoves.push(move);
                    } else if (method === 'tutor') {
                        tutorMoves.push(move);
                    } else {
                        otherMoves.push(move);
                    }
                });
                
                // Sort level-up moves by level
                levelUpMoves.sort((a, b) => {
                    const aLevel = a.version_group_details[0]?.level_learned_at || 0;
                    const bLevel = b.version_group_details[0]?.level_learned_at || 0;
                    return aLevel - bLevel;
                });
                
                // Function to process moves for each category
                const processMoves = async (moves, categoryTitle) => {
                    if (moves.length === 0) return '';
                    
                    let categoryHTML = `
                        <tr class="move-category-header">
                            <th colspan="4">${categoryTitle} (${moves.length})</th>
                        </tr>
                        <tr class="move-table-subheader">
                            <th>Move</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Power / Accuracy</th>
                        </tr>
                    `;
                    
                    for (const move of moves) {
                        try {
                            const moveDetails = move.version_group_details[0] || {};
                            const level = moveDetails.level_learned_at || 0;
                            const method = moveDetails.move_learn_method?.name || 'unknown';
                            
                            let levelInfo = '';
                            if (method === 'level-up') {
                                levelInfo = level === 0 ? 'Lv. 1' : `Lv. ${level}`;
                            } else if (method === 'machine') {
                                levelInfo = 'TM';
                            } else if (method === 'egg') {
                                levelInfo = 'Egg';
                            } else if (method === 'tutor') {
                                levelInfo = 'Tutor';
                            } else {
                                levelInfo = method.replace('-', ' ');
                            }
                            
                            // Fetch detailed move information
                            const moveResponse = await fetch(move.move.url);
                            const moveData = await moveResponse.json();
                            
                            const moveType = moveData.type?.name || 'unknown';
                            const damageClass = moveData.damage_class?.name || 'unknown';
                            const power = moveData.power || '—';
                            const accuracy = moveData.accuracy || '—';
                            
                            // Format damage class for display
                            let categoryClass = '';
                            let categoryText = '';
                            if (damageClass === 'physical') {
                                categoryClass = 'category-physical';
                                categoryText = 'Physical';
                            } else if (damageClass === 'special') {
                                categoryClass = 'category-special';
                                categoryText = 'Special';
                            } else if (damageClass === 'status') {
                                categoryClass = 'category-status';
                                categoryText = 'Status';
                            } else {
                                categoryClass = 'category-other';
                                categoryText = 'Other';
                            }
                            
                            categoryHTML += `
                                <tr class="move-row">
                                    <td class="move-name-cell">
                                        <span class="move-name">${move.move.name.replace('-', ' ')}</span>
                                        <span class="move-learn-method">(${levelInfo})</span>
                                    </td>
                                    <td class="move-type-cell">
                                        <span class="type-badge type-${moveType}">${moveType.toUpperCase()}</span>
                                    </td>
                                    <td class="move-category-cell">
                                        <span class="${categoryClass}">${categoryText}</span>
                                    </td>
                                    <td class="move-power-cell">${power} / ${accuracy}%</td>
                                </tr>
                            `;
                        } catch (error) {
                            // If move details fail, show basic info
                            const moveDetails = move.version_group_details[0] || {};
                            const level = moveDetails.level_learned_at || 0;
                            const method = moveDetails.move_learn_method?.name || 'unknown';
                            
                            let levelInfo = '';
                            if (method === 'level-up') {
                                levelInfo = level === 0 ? 'Lv. 1' : `Lv. ${level}`;
                            } else if (method === 'machine') {
                                levelInfo = 'TM';
                            } else {
                                levelInfo = method.replace('-', ' ');
                            }
                            
                            categoryHTML += `
                                <tr class="move-row">
                                    <td class="move-name-cell">
                                        <span class="move-name">${move.move.name.replace('-', ' ')}</span>
                                        <span class="move-learn-method">(${levelInfo})</span>
                                    </td>
                                    <td colspan="3" class="move-error">Loading...</td>
                                </tr>
                            `;
                        }
                    }
                    
                    return categoryHTML;
                };
                
                // Process each category
                if (levelUpMoves.length > 0) {
                    movesHTML += await processMoves(levelUpMoves, '📈 Level-up Moves');
                }
                if (tmMoves.length > 0) {
                    movesHTML += await processMoves(tmMoves, '💿 TM/TR Moves');
                }
                if (eggMoves.length > 0) {
                    movesHTML += await processMoves(eggMoves, '🥚 Egg Moves');
                }
                if (tutorMoves.length > 0) {
                    movesHTML += await processMoves(tutorMoves, '👨‍🏫 Move Tutor');
                }
                if (otherMoves.length > 0) {
                    movesHTML += await processMoves(otherMoves, '🔧 Other Moves');
                }
                
                movesHTML += '</table>';
                this.innerHTML = movesHTML;
                this.isExpanded = true;
            } else {
                // Collapse moves
                this.innerHTML = `
                    <table class="bulba-table moves-table">
                        <tr class="table-header clickable-header">
                            <th colspan="4">Moves (${totalMoves} total) - Click to expand</th>
                        </tr>
                    </table>
                `;
                this.isExpanded = false;
            }
        };
    }
    catch(error){
        console.error(error);
        // Hide the display if there's an error
        document.getElementById("pokemonDisplay").style.display = "none";
    }
    
}

// Helper function to get stat color based on value
function getStatColor(statValue) {
    if (statValue >= 150) return '#4CAF50';  // Green for high stats
    if (statValue >= 100) return '#8BC34A';  // Light green
    if (statValue >= 80) return '#FFEB3B';   // Yellow
    if (statValue >= 60) return '#FF9800';   // Orange
    if (statValue >= 40) return '#FF5722';   // Red-orange
    return '#F44336';                        // Red for low stats
}