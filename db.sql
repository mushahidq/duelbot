CREATE TABLE IF NOT EXISTS duelbot.users (userid INT PRIMARY KEY, wins INT, losses INT, ties INT);
CREATE TABLE IF NOT EXISTS duelbot.duels (challengerid INT, participantid INT, winnerid INT, tie INT);