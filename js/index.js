document.addEventListener("DOMContentLoaded", function () {
    var storageKey = "bowlingAlleyReviews";
    var reviewContainer = document.getElementById("home-review-cards");

    if (!reviewContainer) {
        return;
    }

    var reviews = loadReviews();
    var latestReviews = getLatestReviews(reviews, 2);

    renderLatestReviews(latestReviews);

    function loadReviews() {
        try {
            var raw = window.localStorage.getItem(storageKey);
            if (!raw) {
                return [];
            }

            var parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed;
        } catch (error) {
            return [];
        }
    }

    function getLatestReviews(reviewList, count) {
        var latest = [];
        var limit = reviewList.length < count ? reviewList.length : count;

        for (var i = 0; i < limit; i += 1) {
            latest.push(reviewList[i]);
        }

        return latest;
    }

    function renderLatestReviews(reviewList) {
        var reviewMarkup = "";

        for (var i = 0; i < reviewList.length; i += 1) {
            var review = reviewList[i];
            reviewMarkup += createReviewCard(review);
        }

        reviewContainer.innerHTML = reviewMarkup + createWriteReviewCard();
    }

    function createReviewCard(review) {
        var stars = buildStars(review.rating);

        return (
            '<div class="col-12 col-md-6 col-lg-4">' +
            '<div class="review-preview card h-100 border-0 shadow-lg">' +
            '<div class="card-body">' +
            '<h3 class="review-name card-title h5">' + escapeHtml(review.name) + '</h3>' +
            '<p class="review-stars mb-2">' + stars + '</p>' +
            '<p class="card-text">' + escapeHtml(review.comment) + '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function createWriteReviewCard() {
        return (
            '<div class="col-12 col-md-12 col-lg-4">' +
            '<div class="review-preview review-preview-cta card h-100 border-0 shadow-lg">' +
            '<div class="card-body d-flex flex-column justify-content-center text-center">' +
            '<h3 class="card-title h5 mb-3">Leave Your Own Review</h3>' +
            '<p class="card-text mb-4">Share your experience with the lane, food, and service.</p>' +
            '<a href="pages/reviews.html" class="btn btn-outline-light review-button">Write a Review</a>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function buildStars(ratingValue) {
        var safeRating = Number(ratingValue) || 0;
        var stars = "";

        for (var i = 0; i < 5; i += 1) {
            if (i < safeRating) {
                stars += "★";
            } else {
                stars += "☆";
            }
        }

        return stars;
    }

    function escapeHtml(value) {
        var text = String(value);
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
});
