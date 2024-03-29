import { Query, QuerySnapshot, getDocs } from "firebase/firestore"
import { ZodType, z } from "zod"
import { StoreResponse } from "../utils/types"

/**
 * Get data by a query from de db and formats the data
 * @param q
 * @returns data formated
 */
export async function findDataByQuery(q: Query, schema: ZodType): Promise<StoreResponse<z.infer<typeof schema>>> {
	// Get documnet from db
	console.log("View doc : " + q)
	const data = await getDocs(q)

	// Format data
	return getSnapshotData(data, schema)
}

/**
 * Get snapshot data well formated
 * @param snapshot
 * @returns
 */
export function getSnapshotData(snapshot: QuerySnapshot, schema: ZodType): StoreResponse<z.infer<typeof schema>> {
	let response: StoreResponse<z.infer<typeof schema>>
	try {
		response = {
			success: true,
			data: snapshot.docs.map((doc) => schema.parse({ id: doc.id, ...doc.data() })),
		}
	} catch (error) {
		response = {
			success: false,
			error: error,
		}
	}
	return response
}
