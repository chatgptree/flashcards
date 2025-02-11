<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tree Species - ChatGPTree</title>
    
    <!-- Fonts and Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Simonetta:ital,wght@0,400;0,900;1,400;1,900&family=Catamaran:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* Base Styles */
        body {
            font-family: 'Catamaran', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F1EFE6;
            color: #333;
        }

        /* Header Styles */
        header {
            background-color: #2E4032;
            background-image: url('../images/header2.jpg');
            background-size: cover;
            background-position: center;
            color: #fff;
            text-align: center;
            padding: 2rem 0;
        }

        h1 {
            font-family: 'Simonetta', serif;
            font-size: 4rem;
            font-weight: 900;
            font-style: italic;
            margin: 0;
            color: #ffffff;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        }

        /* Container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* View Toggle Button */
        .view-toggle {
            background-color: #2E4032;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Catamaran', sans-serif;
            margin: 20px 0;
            transition: opacity 0.3s ease;
        }

        .view-toggle:hover {
            opacity: 0.9;
        }

        /* List View */
        .tree-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .tree-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .tree-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .species-name {
            font-weight: bold;
            color: #2E4032;
            margin: 0;
        }

        .common-name {
            color: #666;
            font-style: italic;
            margin: 5px 0 0 0;
        }

        /* Card View */
        .card-view {
            display: none;
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            perspective: 1000px;
        }

        .card {
            position: relative;
            width: 100%;
            height: 500px;
            cursor: pointer;
            transform-style: preserve-3d;
            transition: transform 0.6s;
        }

        .card.flipped {
            transform: rotateY(180deg);
        }

        .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .card-front {
            background: white;
            overflow: hidden;
        }

        .card-front img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-back {
            background: white;
            transform: rotateY(180deg);
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
        }

        /* Navigation Arrows */
        .nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: #2E4032;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 2;
            transition: opacity 0.3s ease;
        }

        .nav-arrow:hover {
            opacity: 0.9;
        }

        .prev-arrow {
            left: -50px;
        }

        .next-arrow {
            right: -50px;
        }

        /* Menu Button */
        .nav-toggle {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 1000;
            background-color: #2E4032;
            border: 1px solid white;
            border-radius: 6px;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 6px 8px;
            transition: all 0.3s ease;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            h1 {
                font-size: 2.5rem;
            }

            .nav-arrow {
                width: 30px;
                height: 30px;
            }

            .prev-arrow {
                left: -35px;
            }

            .next-arrow {
                right: -35px;
            }
        }
    </style>
</head>
<body>
    <button class="nav-toggle" aria-label="Toggle navigation">
        <i class="fas fa-water"></i>
    </button>

    <header>
        <div class="container">
            <h1>Tree Species</h1>
        </div>
    </header>

    <main class="container">
        <button class="view-toggle" id="viewToggle">Switch to Card View</button>
        
        <!-- List View -->
        <div class="tree-list" id="treeList">
            <!-- Tree items will be inserted here -->
        </div>

        <!-- Card View -->
        <div class="card-view" id="cardView">
            <button class="nav-arrow prev-arrow" id="prevCard">
                <i class="fas fa-chevron-left"></i>
            </button>
            
            <div class="card" id="card">
                <div class="card-front">
                    <img id="cardImage" src="" alt="Tree">
                </div>
                <div class="card-back">
                    <h2 id="cardSpecies"></h2>
                    <p id="cardCommon"></p>
                    <p id="cardOrigin"></p>
                    <p id="cardDescription"></p>
                    <div id="cardFeatures"></div>
                </div>
            </div>

            <button class="nav-arrow next-arrow" id="nextCard">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </main>

    <script>
        // Sample tree data - replace with your actual data
        const trees = [
            {
                species: "Eucalyptus camaldulensis",
                commonName: "River Red Gum",
                origin: "Mainland Australia",
                image: "../images/rusty.jpg",
                description: "A familiar and iconic tree, seen along many watercourses across inland Australia.",
                features: [
                    "Height: 20-45 meters",
                    "Bark: Smooth white or cream-coloured",
                    "Location: Along waterways"
                ]
            },
            // Add more trees...
        ];

        let currentCardIndex = 0;
        let isCardView = false;

        // DOM Elements
        const viewToggle = document.getElementById('viewToggle');
        const treeList = document.getElementById('treeList');
        const cardView = document.getElementById('cardView');
        const card = document.getElementById('card');
        const prevButton = document.getElementById('prevCard');
        const nextButton = document.getElementById('nextCard');

        // Initialize list view
        function initializeList() {
            treeList.innerHTML = trees.map((tree, index) => `
                <div class="tree-item" onclick="showCard(${index})">
                    <p class="species-name">${tree.species}</p>
                    <p class="common-name">${tree.commonName}</p>
                </div>
            `).join('');
        }

        // Show card for specific tree
        function showCard(index) {
            currentCardIndex = index;
            updateCard();
            toggleView();
        }

        // Update card content
        function updateCard() {
            const tree = trees[currentCardIndex];
            document.getElementById('cardImage').src = tree.image;
            document.getElementById('cardSpecies').textContent = tree.species;
            document.getElementById('cardCommon').textContent = tree.commonName;
            document.getElementById('cardOrigin').textContent = `Origin: ${tree.origin}`;
            document.getElementById('cardDescription').textContent = tree.description;
            document.getElementById('cardFeatures').innerHTML = tree.features
                .map(feature => `<p>${feature}</p>`)
                .join('');
        }

        // Toggle between list and card view
        function toggleView() {
            isCardView = !isCardView;
            treeList.style.display = isCardView ? 'none' : 'flex';
            cardView.style.display = isCardView ? 'block' : 'none';
            viewToggle.textContent = isCardView ? 'Back to List' : 'Switch to Card View';
            if (isCardView) {
                card.classList.remove('flipped');
                updateCard();
            }
        }

        // Navigation handlers
        function nextCard() {
            card.classList.remove('flipped');
            setTimeout(() => {
                currentCardIndex = (currentCardIndex + 1) % trees.length;
                updateCard();
            }, 300);
        }

        function prevCard() {
            card.classList.remove('flipped');
            setTimeout(() => {
                currentCardIndex = (currentCardIndex - 1 + trees.length) % trees.length;
                updateCard();
            }, 300);
        }

        // Event Listeners
        viewToggle.addEventListener('click', toggleView);
        card.addEventListener('click', () => card.classList.toggle('flipped'));
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            prevCard();
        });
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            nextCard();
        });

        // Initialize
        initializeList();
    </script>
</body>
</html>
