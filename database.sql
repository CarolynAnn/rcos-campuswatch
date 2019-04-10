CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    first_name varchar(31) NOT NULL,
    last_name varchar(31) NOT NULL,
    rcs_id varchar(15) NOT NULL UNIQUE,
    password varchar(63) NOT NULL,
    address varchar(63) NOT NULL,
    picture_location varchar(255),
    role_id int NOT NULL
);

CREATE TABLE roles (
    id int PRIMARY KEY,
    name VARCHAR(15)
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(63) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE group_members (
    group_id int NOT NULL,
    user_id int NOT NULL,
    role_id int NOT NULL,
    UNIQUE (group_id, user_id, role_id)
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(63) NOT NULL,
    message VARCHAR(1023) NOT NULL,
    poster_id int NOT NULL,
    group_id int NOT NULL,
    posted TIMESTAMP
);

CREATE TABLE group_discussion_messages (
    id  SERIAL PRIMARY KEY,
    title VARCHAR(63) NOT NULL,
    message VARCHAR(1023) NOT NULL,
    group_id int NOT NULL,
    poster_id int NOT NULL,
    posted TIMESTAMP
);

CREATE TABLE group_discussion_replies (
    id SERIAL PRIMARY KEY,
    discusssion_id int NOT NULL,
    message VARCHAR(1023) NOT NULL,
    poster_id int NOT NULL,
    posted TIMESTAMP
);

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    creator_id int,
    last_sent_time TIMESTAMP
);

CREATE TABLE chat_members (
    chat_id int NOT NULL,
    user_id int NOT NULL,
    UNIQUE (chat_id, user_id)
);

CREATE TABLE chat_messages (
    id  SERIAL PRIMARY KEY,
    chat_id int,
    message varchar(255),
    sender_id int
);

ALTER TABLE users
ADD FOREIGN KEY (role_id) REFERENCES roles(id);

ALTER TABLE group_members
ADD FOREIGN KEY (group_id) REFERENCES groups(id);

ALTER TABLE group_members
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE group_members
ADD FOREIGN KEY (role_id) REFERENCES roles(id);

ALTER TABLE alerts
ADD FOREIGN KEY (group_id) REFERENCES groups(id);

ALTER TABLE alerts
ADD FOREIGN KEY (poster_id) REFERENCES users(id);

ALTER TABLE group_discussion_messages
ADD FOREIGN KEY (group_id) REFERENCES groups(id);

ALTER TABLE group_discussion_messages
ADD FOREIGN KEY (poster_id) REFERENCES users(id);

ALTER TABLE group_discussion_replies
ADD FOREIGN KEY (discusssion_id) REFERENCES group_discussion_messages(id);

ALTER TABLE group_discussion_replies
ADD FOREIGN KEY (poster_id) REFERENCES users(id);

ALTER TABLE chats
ADD FOREIGN KEY (creator_id) REFERENCES users(id);

ALTER TABLE chat_members
ADD FOREIGN KEY (chat_id) REFERENCES chats(id);

ALTER TABLE chat_members
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE chat_messages
ADD FOREIGN KEY (chat_id) REFERENCES chats(id);

ALTER TABLE chat_messages
ADD FOREIGN KEY (sender_id) REFERENCES users(id);
