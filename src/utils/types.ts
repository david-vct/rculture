import { z } from "zod"

// Questions Schemas
const QuestionBaseSchema = z.object({
	title: z.string().min(1).max(30),
	rating: z.object({
		like: z.number(),
		dislike: z.number(),
	}),
	difficulty: z.object({
		win: z.number(),
		lose: z.number(),
	}),
	tags: z.array(z.string()),
})

export const SimpleQuestionSchema = QuestionBaseSchema.extend({
	answers: z.array(z.string().trim()).min(1).max(10),
})

export const CompleteQuestionSchema = QuestionBaseSchema.extend({
	description: z.string().min(1),
	answers: z.array(z.string().trim()).min(1).max(10),
})

export const ChoiceQuestionSchema = QuestionBaseSchema.extend({
	choices: z.array(z.string()).min(2).max(10),
	answers: z.array(z.number().min(0).max(9)).min(1).max(10),
})

export const ImageQuestionSchema = QuestionBaseSchema.extend({
	imageUrl: z.string().url().min(1),
	answers: z.array(z.string().trim()).min(1).max(10),
})

export const QuestionSchema = z.union([
	SimpleQuestionSchema,
	CompleteQuestionSchema,
	ChoiceQuestionSchema,
	ImageQuestionSchema,
])

// Questions Types
export type SimpleQuestion = z.infer<typeof SimpleQuestionSchema>
export type CompleteQuestion = z.infer<typeof CompleteQuestionSchema>
export type ChoiceQuestion = z.infer<typeof ChoiceQuestionSchema>
export type ImageQuestion = z.infer<typeof ImageQuestionSchema>

export type Question = z.infer<typeof QuestionSchema>

export enum QuestionType {
	SIMPLE,
	COMPLETE,
	CHOICE,
	IMAGE,
}

// Store types
export const StoreResponseSchema = z.discriminatedUnion("success", [
	z.object({ success: z.literal(true), data: z.object({}) }),
	z.object({ success: z.literal(false), error: z.instanceof(Error) }),
])

export type StoreResponse = z.infer<typeof StoreResponseSchema>

// User types
export const UserInfoSchema = z.object({
	id: z.string(),
	name: z.string(),
	isAuth: z.boolean(),
})

export type UserInfo = z.infer<typeof UserInfoSchema>
