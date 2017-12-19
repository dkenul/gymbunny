# --- Main Schema

# --- !Ups

set ignorecase true;

create table user (
  id bigint primary key auto_increment,
  username varchar(255) unique not null,
  email varchar(255) unique not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
);

create table body_part (
  id bigint primary key auto_increment,
  name varchar(255) unique not null,
);

create table exercise (
  id bigint primary key auto_increment,
  name varchar(255) unique not null,
);

create table exercise_body_part (
  id bigint primary key auto_increment,
  body_part_id bigint not null,
  exercise_id bigint not null,
  foreign key (body_part_id) references body_part (id),
  foreign key (exercise_id) references exercise (id)
);

create table workout (
  id bigint primary key auto_increment,
  user_id bigint not null,
  on_date date not null,
  description text,
  foreign key (user_id) references user (id)
);

create table workout_exercise (
  id bigint primary key auto_increment,
  workout_id bigint not null,
  exercise_id bigint not null,
  foreign key (workout_id) references workout (id) on delete cascade,
  foreign key (exercise_id) references exercise (id)
);

create table workout_exercise_set (
  id bigint primary key auto_increment,
  workout_exercise_id bigint not null,
  weight decimal not null,
  reps int not null,
  foreign key (workout_exercise_id) references workout_exercise (id) on delete cascade
);

# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists user;
drop table if exists body_part;
drop table if exists exercise;
drop table if exists exercise_body_part;
drop table if exists workout;
drop table if exists workout_exercise;
drop table if exists workout_exercise_set;

SET REFERENTIAL_INTEGRITY TRUE;
