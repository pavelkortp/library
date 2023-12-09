/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `year` int NOT NULL,
  `language` varchar(50) NOT NULL,
  `pages` int NOT NULL,
  `rating` int NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `clicks` int NOT NULL DEFAULT '0',
  `creation_date` datetime NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `deleted` datetime DEFAULT NULL,
  `isbn` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE = InnoDB AUTO_INCREMENT = 54 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books
# ------------------------------------------------------------

INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    1,
    'Перша книга',
    '4ваіапшщвіфнщашнуцщшанцруз9щарзуцрзащрцу',
    2022,
    'українська',
    213,
    2,
    11,
    0,
    '2023-12-02 19:39:06',
    '[\"321\",\"312\"]',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    2,
    'Друга книга',
    '32414',
    2023,
    'українська',
    345,
    2,
    8,
    0,
    '2023-12-02 19:39:06',
    '[\"Другий Автор\",\"\"]',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    3,
    'Третя книга',
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',
    2003,
    'українська',
    546,
    2,
    0,
    0,
    '2023-12-02 19:39:06',
    'Третій Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    4,
    'П\'ята книга',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    2005,
    'українська',
    456,
    2,
    0,
    0,
    '2023-12-02 19:39:06',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    5,
    'Книга 6',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    2015,
    'українська',
    214,
    2,
    0,
    0,
    '2023-12-02 19:39:06',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    6,
    'Книга 7',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    1999,
    'українська',
    435,
    2,
    32,
    1,
    '2023-12-02 19:39:06',
    'Павло Журбицький ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    7,
    'КНига 4',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    2012,
    'українська',
    312,
    2,
    1,
    0,
    '2023-12-02 19:39:06',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    8,
    'Книга 8',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    1111,
    'українська',
    422,
    2,
    19,
    1,
    '2023-12-02 19:39:06',
    'АВТОР ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    9,
    'Книга 9',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    2018,
    'українська',
    435,
    2,
    0,
    0,
    '2023-12-02 19:39:06',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    10,
    'Книга 11',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    2011,
    'українська',
    232,
    2,
    1,
    0,
    '2023-12-02 19:39:06',
    'АААААААА ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    11,
    'Книга 10',
    'Where can I get some?\r\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    2020,
    'українська',
    345,
    2,
    3,
    1,
    '2023-12-02 19:39:06',
    'АВТОР ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    12,
    'Книга 12',
    '\r\nWhere does it come from?\r\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\r\n\r\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et ',
    2023,
    'українська',
    333,
    2,
    2,
    1,
    '2023-12-02 19:39:06',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    13,
    '14 КНИГА',
    'Системи ціннісних орієнтацій, такі як етизм, естетизм, утилітаризм, науково-теоретична і політична орієнтація, визначають спосіб, яким людина сприймає і взаємодіє з навколишнім світом. Наприклад, етизм покладає акцент на етичні принципи та мораль, естетизм - на красу і художній вираз, утилітаризм - на користь та практичність, науково-теоретична орієнтація - на знання і розуміння, а політична орієнтація - на суспільно-політичні цінності.\r\n\r\nБазові цінності, такі як добро (благо), свобода, користь, істина, правда, творчість, краса, віра, визначають загальні принципи, які визначають ціннісну систему суспільства. Ці базові цінності можуть взаємодіяти і взаємопоєднуватися, визначаючи цілісну картину цінностей. Наприклад, благо виступає як єдність істини, добра і міри, враховуючи важливі аспекти життя людини.\r\n',
    2014,
    'english',
    314,
    2,
    1,
    0,
    '2023-12-02 19:39:06',
    'Другий Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    14,
    'книга 13',
    'Системи ціннісних орієнтацій, такі як етизм, естетизм, утилітаризм, науково-теоретична і політична орієнтація, визначають спосіб, яким людина сприймає і взаємодіє з навколишнім світом. Наприклад, етизм покладає акцент на етичні принципи та мораль, естетизм - на красу і художній вираз, утилітаризм - на користь та практичність, науково-теоретична орієнтація - на знання і розуміння, а політична орієнтація - на суспільно-політичні цінності.\r\n\r\nБазові цінності, такі як добро (благо), свобода, користь, істина, правда, творчість, краса, віра, визначають загальні принципи, які визначають ціннісну систему суспільства. Ці базові цінності можуть взаємодіяти і взаємопоєднуватися, визначаючи цілісну картину цінностей. Наприклад, благо виступає як єдність істини, добра і міри, враховуючи важливі аспекти життя людини.',
    1768,
    'українська',
    444,
    2,
    8,
    0,
    '2023-12-02 19:39:06',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    15,
    '15 книга',
    'Системи ціннісних орієнтацій, такі як етизм, естетизм, утилітаризм, науково-теоретична і політична орієнтація, визначають спосіб, яким людина сприймає і взаємодіє з навколишнім світом. Наприклад, етизм покладає акцент на етичні принципи та мораль, естетизм - на красу і художній вираз, утилітаризм - на користь та практичність, науково-теоретична орієнтація - на знання і розуміння, а політична орієнтація - на суспільно-політичні цінності.\r\n\r\nБазові цінності, такі як добро (благо), свобода, користь, істина, правда, творчість, краса, віра, визначають загальні принципи, які визначають ціннісну систему суспільства. Ці базові цінності можуть взаємодіяти і взаємопоєднуватися, визначаючи цілісну картину цінностей. Наприклад, благо виступає як єдність істини, добра і міри, враховуючи важливі аспекти життя людини.',
    2021,
    'українська',
    234,
    2,
    1,
    0,
    '2023-12-02 19:39:06',
    'Третій Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    16,
    '16 книга ',
    'Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    2016,
    'українська',
    345,
    2,
    0,
    0,
    '2023-12-02 19:39:06',
    'Другий Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    17,
    '17 книга',
    'Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    1983,
    'українська',
    222,
    2,
    0,
    0,
    '2023-12-02 19:39:06',
    'Другий Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    18,
    '19 книга',
    'Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    2019,
    'українська',
    345,
    2,
    0,
    0,
    '2023-12-02 19:39:06',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    19,
    '18 Книга',
    'Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    1918,
    'українська',
    2015,
    2,
    11,
    0,
    '2023-12-02 19:39:06',
    'Третій Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    20,
    '20 книга',
    'Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    2022,
    'українська',
    432,
    2,
    5,
    0,
    '2023-12-02 19:39:06',
    'Другий Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    21,
    'Тестова',
    ' <script src=\"js/libs.min.js\"></script> <script src=\"js/libs.min.js\"></script> <script src=\"js/libs.min.js\"></script>',
    324,
    'українська',
    324,
    2,
    5,
    1,
    '2023-12-03 00:45:16',
    'Другий Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    22,
    'ТЕСТ1',
    'кцйкйаца',
    2321,
    'українська',
    321,
    2,
    3,
    0,
    '2023-12-03 17:42:20',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    23,
    'ТЕСТ2',
    'кцйкйацаconsole.log(`OFFSET FROM NEXT ${offset}`);console.log(`OFFSET FROM NEXT ${offset}`);',
    2321,
    'українська',
    321,
    2,
    1,
    0,
    '2023-12-03 17:42:31',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    24,
    'ТЕСТ3',
    'кцйкйацаconsole.log(`OFFSET FROM NEXT ${offset}`);console.log(`OFFSET FROM NEXT ${offset}`);',
    2321,
    'українська',
    321,
    2,
    3,
    0,
    '2023-12-03 17:42:40',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    25,
    'ТЕСТ4',
    'кцйкйацаconsole.log(`OFFSET FROM NEXT ${offset}`);console.log(`OFFSET FROM NEXT ${offset}`);',
    2321,
    'українська',
    321,
    2,
    1,
    0,
    '2023-12-03 17:42:47',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    26,
    'ТЕСТ5',
    'кцйкйацаconsole.log(`OFFSET FROM NEXT ${offset}`);console.log(`OFFSET FROM NEXT ${offset}`);',
    2321,
    'українська',
    321,
    2,
    0,
    0,
    '2023-12-03 17:43:01',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    27,
    'ТЕСТ6',
    'console.log(`OFFSET FROM NEXT ${offset}`);console.log(`OFFSET FROM NEXT ${offset}`);',
    321,
    'english',
    412,
    2,
    4,
    2,
    '2023-12-03 17:44:03',
    'Третій Автор Другий Автор',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    28,
    'ТЕСТ7',
    'console.log(`OFFSET FROM NEXT ${offset}`);console.log(`OFFSET FROM NEXT ${offset}`);',
    321,
    'english',
    412,
    2,
    2,
    0,
    '2023-12-03 17:44:11',
    'Третій Автор Другий Автор',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    29,
    'ТЕСТ8',
    'console.log(`OFFSET FROM NEXT ${offset}`);console.log(`OFFSET FROM NEXT ${offset}`);',
    321,
    'english',
    412,
    2,
    6,
    0,
    '2023-12-03 17:44:26',
    'Третій Автор Другий Автор',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    30,
    'тест9',
    'doAjaxQuery(\'GET\', \'admin/api/v1/books\', data, function (res) {\r\n        // Adding received books\r\n        view.addBooksItems(res.data.books, true);\r\n        view.addPages(res.data.totalPages, true);\r\n\r\n        if (localStorage.getItem(\'h\')) {\r\n            $(window).scrollTop(localStorage.getItem(\'h\'));\r\n            localStorage.removeItem(\'h\');\r\n        }\r\n    });doAjaxQuery(\'GET\', \'admin/api/v1/books\', data, function (res) {\r\n        // Adding received books\r\n        view.addBooksItems(res.data.books, true);\r\n        view.addPages(res.data.totalPages, true);\r\n\r\n        if (localStorage.getItem(\'h\')) {\r\n            $(window).scrollTop(localStorage.getItem(\'h\'));\r\n            localStorage.removeItem(\'h\');\r\n        }\r\n    });',
    312,
    '421',
    442,
    2,
    0,
    0,
    '2023-12-03 17:46:30',
    'Третій Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    31,
    'тест10',
    'doAjaxQuery(\'GET\', \'admin/api/v1/books\', data, function (res) {\r\n        // Adding received books\r\n        view.addBooksItems(res.data.books, true);\r\n        view.addPages(res.data.totalPages, true);\r\n\r\n        if (localStorage.getItem(\'h\')) {\r\n            $(window).scrollTop(localStorage.getItem(\'h\'));\r\n            localStorage.removeItem(\'h\');\r\n        }\r\n    });doAjaxQuery(\'GET\', \'admin/api/v1/books\', data, function (res) {\r\n        // Adding received books\r\n        view.addBooksItems(res.data.books, true);\r\n        view.addPages(res.data.totalPages, true);\r\n\r\n        if (localStorage.getItem(\'h\')) {\r\n            $(window).scrollTop(localStorage.getItem(\'h\'));\r\n            localStorage.removeItem(\'h\');\r\n        }\r\n    });',
    312,
    '421',
    442,
    2,
    2,
    1,
    '2023-12-03 17:46:39',
    'Третій Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    32,
    'тест11',
    'doAjaxQuery(\'GET\', \'admin/api/v1/books\', data, function (res) {\r\n        // Adding received books\r\n        view.addBooksItems(res.data.books, true);\r\n        view.addPages(res.data.totalPages, true);\r\n\r\n        if (localStorage.getItem(\'h\')) {\r\n            $(window).scrollTop(localStorage.getItem(\'h\'));\r\n            localStorage.removeItem(\'h\');\r\n        }\r\n    });doAjaxQuery(\'GET\', \'admin/api/v1/books\', data, function (res) {\r\n        // Adding received books\r\n        view.addBooksItems(res.data.books, true);\r\n        view.addPages(res.data.totalPages, true);\r\n\r\n        if (localStorage.getItem(\'h\')) {\r\n            $(window).scrollTop(localStorage.getItem(\'h\'));\r\n            localStorage.removeItem(\'h\');\r\n        }\r\n    });',
    312,
    '421',
    442,
    2,
    0,
    0,
    '2023-12-03 17:46:53',
    'Третій Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    33,
    'ТЕСТ12',
    '4221аіфgetTable(data);getTable(data);',
    425,
    'english',
    324,
    2,
    12,
    3,
    '2023-12-03 17:48:26',
    'Третій Автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    34,
    'тест13',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    0,
    0,
    '2023-12-03 20:04:56',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    35,
    'тест14',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    0,
    0,
    '2023-12-03 20:05:13',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    36,
    'тест15',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    0,
    0,
    '2023-12-03 20:05:17',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    37,
    'тест16',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    5,
    2,
    '2023-12-03 20:05:19',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    38,
    'тест17',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    24,
    0,
    '2023-12-03 20:05:22',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    39,
    'тест18',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    4,
    1,
    '2023-12-03 20:05:25',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    41,
    'тест19',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    0,
    0,
    '2023-12-03 20:05:29',
    'Перший автор ',
    NULL,
    NULL
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `year`,
    `language`,
    `pages`,
    `rating`,
    `views`,
    `clicks`,
    `creation_date`,
    `author`,
    `deleted`,
    `isbn`
  )
VALUES
  (
    42,
    'тест20',
    'get()get()get()get()get()get()get()',
    1245,
    'українська',
    324,
    2,
    2,
    1,
    '2023-12-03 20:05:37',
    'Перший автор ',
    NULL,
    NULL
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
