export default function filterReviewsByQuery(reviews, query) {
  if (!query) return reviews;
  return reviews?.filter((review) => review?.summary.includes(query));
}
