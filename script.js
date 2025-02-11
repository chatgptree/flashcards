// Tree data structure

import trees from './data/trees.js';

const trees = [
    {
        species: "Eucalyptus camaldulensis",
        commonName: "River Red Gum",
        origin: "Mainland Australia",
        image: "../images/trees/rusty.jpg",
        description: "A familiar and iconic tree, seen along many watercourses across inland Australia.",
        features: [
            "Height: 20-45 meters",
            "Bark: Smooth white or cream-coloured",
            "Location: Along waterways"
        ]
    },
    // Add more trees...
];

class TreeCardManager {
    constructor() {
        // State
        this.currentIndex = 0;
        this.isCardView = false;
        this.isFlipped = false;
        this.isTransitioning = false;

        // DOM Elements
        this.viewToggle = document.getElementById('viewToggle');
        this.treeList = document.getElementById('treeList');
        this.cardView = document.getElementById('cardView');
        this.card = document.getElementById('card');
        this.prevButton = document.getElementById('prevCard');
        this.nextButton = document.getElementById('nextCard');

        // Initialize
        this.init();
    }

    init() {
        this.renderList();
        this.attachEventListeners();
        this.updateCard();
    }

    renderList() {
        this.treeList.innerHTML = trees.map((tree, index) => `
            <div class="tree-item" data-index="${index}">
                <p class="species-name">${tree.species}</p>
                <p class="common-name">${tree.commonName}</p>
            </div>
        `).join('');
    }

    attachEventListeners() {
        // View toggle
        this.viewToggle.addEventListener('click', () => this.toggleView());

        // Card flip
        this.card.addEventListener('click', (e) => {
            if (!this.isTransitioning) {
                this.flipCard();
            }
        });

        // Navigation
        this.prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateCards('prev');
        });

        this.nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateCards('next');
        });

        // List item clicks
        this.treeList.addEventListener('click', (e) => {
            const item = e.target.closest('.tree-item');
            if (item) {
                const index = parseInt(item.dataset.index);
                this.showCard(index);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isCardView) {
                switch(e.key) {
                    case 'ArrowLeft':
                        this.navigateCards('prev');
                        break;
                    case 'ArrowRight':
                        this.navigateCards('next');
                        break;
                    case 'Escape':
                        this.toggleView();
                        break;
                    case 'Space':
                        this.flipCard();
                        break;
                }
            }
        });

        // Handle transition end
        this.card.addEventListener('transitionend', () => {
            this.isTransitioning = false;
        });
    }

    toggleView() {
        this.isCardView = !this.isCardView;
        this.treeList.style.display = this.isCardView ? 'none' : 'flex';
        this.cardView.style.display = this.isCardView ? 'block' : 'none';
        this.viewToggle.textContent = this.isCardView ? 'Back to List' : 'Switch to Card View';
        
        if (this.isCardView) {
            this.unflipCard();
            this.updateCard();
        }
    }

    showCard(index) {
        this.currentIndex = index;
        this.unflipCard();
        setTimeout(() => {
            this.toggleView();
            this.updateCard();
        }, 100);
    }

    updateCard() {
        const tree = trees[this.currentIndex];
        
        // Front of card (image)
        const cardImage = document.getElementById('cardImage');
        cardImage.src = tree.image;
        cardImage.alt = `${tree.commonName} - ${tree.species}`;

        // Back of card (details)
        document.getElementById('cardSpecies').textContent = tree.species;
        document.getElementById('cardCommon').textContent = tree.commonName;
        document.getElementById('cardOrigin').textContent = `Origin: ${tree.origin}`;
        document.getElementById('cardDescription').textContent = tree.description;
        
        // Features list
        const featuresList = document.getElementById('cardFeatures');
        featuresList.innerHTML = tree.features
            .map(feature => `<div class="feature-item">${feature}</div>`)
            .join('');
    }

    flipCard() {
        this.isTransitioning = true;
        this.isFlipped = !this.isFlipped;
        this.card.classList.toggle('flipped', this.isFlipped);
    }

    unflipCard() {
        this.isFlipped = false;
        this.card.classList.remove('flipped');
    }

    navigateCards(direction) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.unflipCard();
        
        setTimeout(() => {
            if (direction === 'prev') {
                this.currentIndex = (this.currentIndex - 1 + trees.length) % trees.length;
            } else {
                this.currentIndex = (this.currentIndex + 1) % trees.length;
            }
            this.updateCard();
        }, 300);
    }
}

// Touch Swipe Handling
class TouchHandler {
    constructor(cardManager) {
        this.cardManager = cardManager;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;

        this.init();
    }

    init() {
        const card = document.getElementById('card');
        
        card.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        }, false);

        card.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, false);
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                this.cardManager.navigateCards('prev');
            } else {
                this.cardManager.navigateCards('next');
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cardManager = new TreeCardManager();
    const touchHandler = new TouchHandler(cardManager);
});

// Analytics tracking (if needed)
function trackEvent(eventName, properties = {}) {
    if (typeof sa_event !== 'undefined') {
        sa_event(eventName, properties);
    }
}
