document.addEventListener("DOMContentLoaded", function () {
    const storageKey = "bowlingAlleyReviews";
    const reviewForm = document.getElementById("review-form");
    const toggleReviewFormButton = document.getElementById("toggle-review-form-button");
    const cancelReviewButton = document.getElementById("cancel-review-button");
    const reviewCardsContainer = document.getElementById("review-cards");
    const nameInput = document.getElementById("review-name");
    const commentsInput = document.getElementById("review-comments");
    const ratingStarsContainer = document.getElementById("rating-stars");
    const ratingNumber = document.getElementById("rating-number");
    const averageRatingValue = document.getElementById("average-rating-value");
    const averageRatingStars = document.getElementById("average-rating-stars");

    let selectedRating = 0;
    let reviews = loadReviews();

    if (reviews.length === 0) {
        reviews = extractInitialReviews();
        saveReviews(reviews);
    }

    setupRatingStars();
    renderReviews(reviews);
    updateAverageRating(reviews);

    toggleReviewFormButton.addEventListener("click", function () {
        const isHidden = reviewForm.classList.contains("hidden");
        reviewForm.classList.toggle("hidden");
        if (isHidden) {
            nameInput.focus();
        }
    });

    cancelReviewButton.addEventListener("click", function () {
        clearForm();
        reviewForm.classList.add("hidden");
    });

    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const comment = commentsInput.value.trim();

        if (!name || !comment || selectedRating < 1) {
            window.alert("Please enter your name, comment, and a rating from 1 to 5.");
        } else {

            const newReview = {
                name: name,
                comment: comment,
                rating: selectedRating,
                createdAt: Date.now()
            };

            reviews.unshift(newReview);
            saveReviews(reviews);
            renderReviews(reviews);
            updateAverageRating(reviews);
            clearForm();
            reviewForm.classList.add("hidden");
        }
    });

    function setupRatingStars() {
        ratingStarsContainer.innerHTML = "";

        for (let i = 1; i <= 5; i += 1) {
            const starButton = document.createElement("button");
            starButton.type = "button";
            starButton.textContent = "★";
            starButton.setAttribute("data-value", String(i));

            starButton.addEventListener("click", function (event) {
                const target = event.currentTarget;
                selectedRating = Number(target.getAttribute("data-value"));
                updateSelectedRating();
            });

            ratingStarsContainer.appendChild(starButton);
        }

        updateSelectedRating();
    }

    function updateSelectedRating() {
        const starButtons = ratingStarsContainer.querySelectorAll("button");

        for (let index = 0; index < starButtons.length; index += 1) {
            const button = starButtons[index];
            if (index < selectedRating) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        }

        ratingNumber.textContent = String(selectedRating);
    }

    function renderReviews(reviewList) {
        reviewCardsContainer.innerHTML = "";

        for (let i = 0; i < reviewList.length; i += 1) {
            const review = reviewList[i];
            const column = document.createElement("div");
            column.className = "col-12 col-md-6";

            const card = document.createElement("div");
            card.className = "review-card card h-100 border-0 shadow-sm";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const nameElement = document.createElement("h2");
            nameElement.className = "card-title h4";
            nameElement.textContent = review.name;

            const starsElement = document.createElement("p");
            starsElement.className = "stars";
            starsElement.textContent = starsFromRating(review.rating);

            const commentElement = document.createElement("p");
            commentElement.className = "card-text";
            commentElement.textContent = review.comment;

            cardBody.appendChild(nameElement);
            cardBody.appendChild(starsElement);
            cardBody.appendChild(commentElement);
            card.appendChild(cardBody);
            column.appendChild(card);
            reviewCardsContainer.appendChild(column);
        }
    }

    function updateAverageRating(reviewList) {
        if (reviewList.length === 0) {
            averageRatingValue.textContent = "0.0";
            averageRatingStars.textContent = "☆☆☆☆☆";
        } else {

            let total = 0;
            for (let i = 0; i < reviewList.length; i += 1) {
                total += Number(reviewList[i].rating);
            }

            const average = total / reviewList.length;
            averageRatingValue.textContent = average.toFixed(1);
            averageRatingStars.textContent = starsFromRating(Math.round(average));
        }
    }

    function starsFromRating(ratingValue) {
        const safeRating = Math.max(0, Math.min(5, Number(ratingValue) || 0));
        let stars = "";

        for (let i = 0; i < 5; i += 1) {
            if (i < safeRating) {
                stars += "★";
            } else {
                stars += "☆";
            }
        }

        return stars;
    }

    function clearForm() {
        reviewForm.reset();
        selectedRating = 0;
        updateSelectedRating();
    }

    function loadReviews() {
        try {
            const raw = window.localStorage.getItem(storageKey);
            if (!raw) {
                return [];
            }

            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                return [];
            }

            const cleanReviews = [];

            for (let i = 0; i < parsed.length; i += 1) {
                const review = parsed[i];
                if (review && typeof review.name === "string" && typeof review.comment === "string") {
                    cleanReviews.push(review);
                }
            }

            return cleanReviews;
        } catch (error) {
            return [];
        }
    }

    function saveReviews(reviewList) {
        window.localStorage.setItem(storageKey, JSON.stringify(reviewList));
    }

    function extractInitialReviews() {
        const initialCards = reviewCardsContainer.querySelectorAll(".review-card");
        const initialReviews = [];

        for (let i = 0; i < initialCards.length; i += 1) {
            const card = initialCards[i];
            const heading = card.querySelector("h2");
            const paragraphs = card.querySelectorAll("p");
            const starsLine = card.querySelector(".stars");
            const name = heading ? heading.textContent : "Anonymous";
            const comment = paragraphs.length > 1 ? paragraphs[1].textContent : "";
            const starsText = starsLine ? starsLine.textContent : "";

            let rating = 0;
            for (let j = 0; j < starsText.length; j += 1) {
                if (starsText[j] === "★") {
                    rating += 1;
                }
            }

            initialReviews.push({
                name: name.trim(),
                comment: comment.trim(),
                rating: rating,
                createdAt: Date.now()
            });
        }

        return initialReviews;
    }
});
