UPDATE books
SET deleted = (DATE_ADD(NOW(), INTERVAL 24 HOUR))
WHERE id = (?)