import { z } from "zod"

/* User types */

export const UserInfoSchema = z.object({
	id: z.string(),
	name: z.string(),
	isAuth: z.boolean(),
})

export const GameUserSchema = z.object({
	name: z.string(),
	answers: z.record(z.string(), z.string()),
	reviews: z.record(z.string(), z.record(z.string(), z.boolean())),
	scores: z.record(z.string(), z.number()),
})

export type UserInfo = z.infer<typeof UserInfoSchema>
export type GameUser = z.infer<typeof GameUserSchema>

/* Questions Types */

export enum QuestionType {
	SIMPLE,
	COMPLETE,
	CHOICE,
	IMAGE,
}

export const QuestionDataSchema = z.object({
	title: z.string().min(1).max(100),
	body: z.array(z.string()),
	answers: z.array(z.string().trim()).min(1).max(10),
	tags: z.array(z.string()),
	type: z.nativeEnum(QuestionType),
	rating: z.object({
		like: z.number(),
		dislike: z.number(),
	}),
	difficulty: z.object({
		win: z.number(),
		lose: z.number(),
	}),
})

export const QuestionSchema = QuestionDataSchema.extend({
	id: z.string(),
})

export type QuestionData = z.infer<typeof QuestionDataSchema>
export type Question = z.infer<typeof QuestionSchema>

/* Game types */

export enum GameState {
	WAITING,
	PLAYING,
	REVIEWING,
	END,
}

export const GameDataSchema = z.object({
	name: z.string().toUpperCase().length(4),
	isSetup: z.boolean(),
	users: z.record(z.string(), GameUserSchema),
	tags: z.array(z.string()),
	questions: z.array(QuestionSchema),
	questionIndex: z.number(),
})

export const GameSchema = GameDataSchema.extend({
	id: z.string(),
})

export type GameData = z.infer<typeof GameDataSchema>
export type Game = z.infer<typeof GameSchema>

/* Store types */

export const StoreResponseSchema = z.discriminatedUnion("success", [
	z.object({ success: z.literal(true), data: z.object({}) }),
	z.object({ success: z.literal(false), error: z.any() }),
])

export type StoreResponse<DataType> = { success: true; data: DataType[] } | { success: false; error: unknown }
