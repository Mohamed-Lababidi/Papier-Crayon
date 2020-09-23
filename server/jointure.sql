SELECT u.*, r.role_name FROM Users u
LEFT JOIN Role r
ON u.role_id = r.id;

ALTER TABLE Users DROP COLUMN role_id;
ALTER TABLE Users ADD COLUMN role ENUM('designer', 'client', 'admin') DEFAULT 'client';

champs role avec un ENUM dans la table Users

http://localhost:8080/:id/designer