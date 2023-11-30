export default function filterReviewsByQuery(reviews, query) {
  if (!query) return reviews;
  return reviews?.filter(
    (review) => (review?.summary.toLowerCase().includes(query.toLowerCase())
      || review?.body.toLowerCase().includes(query.toLowerCase())),
  );
}
