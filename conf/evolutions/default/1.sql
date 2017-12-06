# --- First database schema

# --- !Ups

set ignorecase true;

create table user (
  id bigint primary key auto_increment,
  username varchar(255) not null,
  email varchar(255) not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
);

create table body_part (
  id bigint primary key auto_increment,
  name varchar(255) not null,
);

create table exercise (
  id bigint primary key auto_increment,
  name varchar(255) not null,
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

create table exercise_set (
  id bigint primary key auto_increment,
  workout_id bigint not null,
  exercise_id bigint not null,
  foreign key (workout_id) references workout (id),
  foreign key (exercise_id) references exercise (id)
);

create table set_rep (
  id bigint primary key auto_increment,
  exercise_set_id bigint not null,
  foreign key (exercise_set_id) references exercise_set (id)
);

create table company (
  id                        bigint not null,
  name                      varchar(255) not null,
  constraint pk_company primary key (id))
;

create table computer (
  id                        bigint not null,
  name                      varchar(255) not null,
  introduced                timestamp,
  discontinued              timestamp,
  company_id                bigint,
  constraint pk_computer primary key (id))
;

create sequence company_seq start with 1000;

create sequence computer_seq start with 1000;

alter table computer add constraint fk_computer_company_1 foreign key (company_id) references company (id) on delete restrict on update restrict;
create index ix_computer_company_1 on computer (company_id);


# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists user;
drop table if exists body_part;
drop table if exists exercise;
drop table if exists exercise_body_part;
drop table if exists workout;
drop table if exists exercise_set;
drop table if exists set_rep;

drop table if exists company;

drop table if exists computer;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists company_seq;

drop sequence if exists computer_seq;
