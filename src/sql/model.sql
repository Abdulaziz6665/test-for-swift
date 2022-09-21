

create table users(
    id serial primary key,
    name varchar(255) not null,
    password varchar(255) not null
);

create table messages(
    id serial primary key,
    message text not null,
    user_id integer not null references users(id)
);

create table foods(
    id serial primary key,
    name varchar(255) not null,
    price int not null,
    img varchar(255)
);