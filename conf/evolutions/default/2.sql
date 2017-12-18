# --- Sample dataset

# --- !Ups

insert into user (username,email,first_name,last_name) values ('damon','damon@example.com','Damon', 'Kenul');
insert into user (username,email,first_name,last_name) values ('peter','peter@example.com','Peter', 'Bucci');
insert into user (username,email,first_name,last_name) values ('jim','jim@example.com','Jim', 'Jim');

insert into body_part (name) values ('chest');
insert into body_part (name) values ('legs');
insert into body_part (name) values ('bicep');
insert into body_part (name) values ('back');
insert into body_part (name) values ('tricep');

insert into exercise (name) values ('curl');
insert into exercise (name) values ('bench press');

insert into exercise_body_part (body_part_id, exercise_id) values (3, 1);
insert into exercise_body_part (body_part_id, exercise_id) values (1, 2);

insert into workout (user_id, on_date, description) values (1, now(), 'upper body');
insert into workout_exercise (workout_id, exercise_id) values (1,2);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (1, 120, 8);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (1, 130, 7);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (1, 120, 7);
insert into workout_exercise (workout_id, exercise_id) values (1,1);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (2, 25, 10);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (2, 20, 9);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (2, 15, 8);

insert into workout (user_id, on_date, description) values (1, now(), 'upper body');
insert into workout_exercise (workout_id, exercise_id) values (2,2);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (3, 120, 9);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (3, 130, 9);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (3, 120, 9);
insert into workout_exercise (workout_id, exercise_id) values (2,1);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (4, 30, 10);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (4, 25, 9);
insert into workout_exercise_set(workout_exercise_id, weight, reps) values (4, 15, 8);


# --- !Downs
  
SET REFERENTIAL_INTEGRITY FALSE;

delete from user;
delete from body_part;
delete from exercise;
delete from exercise_body_part;
delete from workout;
delete from workout_exercise;
delete from workout_exercise_set;

SET REFERENTIAL_INTEGRITY TRUE;
