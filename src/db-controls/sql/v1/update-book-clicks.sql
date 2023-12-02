UPDATE books
SET clicks = clicks + 1
WHERE id = ?
LIMIT 1
