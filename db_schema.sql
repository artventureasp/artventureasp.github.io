-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- SQL commands here (remember, there are syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS siteMetadata (
    row_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    siteTitle TEXT NOT NULL,
    siteSubtitle TEXT NOT NULL,
    siteAuthor TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    userEmail TEXT NOT NULL,
    userPassword TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    post_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    postTitle TEXT NOT NULL,
    postMood TEXT NOT NULL, --one of the established mood options
    postContent TEXT NOT NULL,
    publishStatus TEXT NOT NULL, -- we will call published and draft. could change to a boolean. 
    publishPrivacy TEXT NOT NULL, -- we will call private and public. could change to a boolean. 
    user_ID  INTEGER, --the user that the record belongs to
    FOREIGN KEY (user_ID) REFERENCES users(user_ID)
);

CREATE TABLE IF NOT EXISTS commentRecords (
    comment_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    commentAuthor TEXT NOT NULL, 
    commentContent TEXT NOT NULL,
    post_ID  INTEGER, --the post that the comment belongs to
    --need to add info about reactions/likes
    FOREIGN KEY (post_ID) REFERENCES posts(post_ID)
);

--default data for db testing- this whole block can be commented out later. 
INSERT INTO users ("userEmail", "userPass") VALUES ("test@test.com","test");
--add more for other db stuff later
--end default data


COMMIT;