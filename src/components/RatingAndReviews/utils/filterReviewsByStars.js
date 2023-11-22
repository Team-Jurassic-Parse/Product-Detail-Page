export default function filterReviewsByStars(reviews, starsFilter) {
  return reviews.filter((review) => starsFilter[review.rating]);
}
