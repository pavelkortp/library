UPDATE books
SET views = views + 1
WHERE id = ?
LIMIT 1
