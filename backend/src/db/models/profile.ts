/** @module Models/Profile */
import TypeORM from "typeorm";
import {User} from "./user";
import {Match} from "./match";

/**
 * Profile model - This is for interacting with the profile table
 * Each profile corresponds to exactly 1 pet owned by a User.
 * This allows each user to have many pet profiles without needing to create more accounts
 */
@TypeORM.Entity()
export class Profile extends TypeORM.BaseEntity {
	@TypeORM.PrimaryGeneratedColumn()
	id: number;

	@TypeORM.Column()
	name: string;

	@TypeORM.Column()
	picture: string;

	@TypeORM.ManyToOne((type) => User, (user: User) => user.profiles, {
		cascade: true,
		onDelete: "CASCADE"
	})
	user: TypeORM.Relation<User>;

	@TypeORM.OneToMany((type) => Match, (match) => match.matcher, {
		cascade: true,
		onDelete: "CASCADE"
	})
	matches: TypeORM.Relation<Match[]>;

	@TypeORM.OneToMany((type) => Match, (match) => match.matchee, {
		//adding an IPHistory will also add associated User if it is new, somewhat useless in this example
		cascade: true,
		// if we delete a profile, remove their matches as well
		onDelete: "CASCADE"
	})
	matchedBy: TypeORM.Relation<Match[]>;

	@TypeORM.CreateDateColumn()
	created_at: string;
}

/*
TINDER: you are profile1
when you swipe-right on another profile, say profile2
> Create a new Match row in the Match table and set its matching_profile to our user

if someone else swipes right on YOUR profile, again, profile1
> Create a new match row in the match table and set its matched_Profile to our user

 */
