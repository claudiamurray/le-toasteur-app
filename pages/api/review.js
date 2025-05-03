import { NextResponse } from "next/server";

export async function GET() {
	const API_KEY = process.env.GOOGLE_API_KEY;
	const ACCOUNT_ID = process.env.GOOGLE_ACCOUNT_ID;
	const LOCATION_ID = process.env.GOOGLE_LOCATION_ID;

	try {
		const res = await fetch(
			`https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT_ID}/locations/${LOCATION_ID}/reviews?key=${API_KEY}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
				},
			}
		);

		if (!res.ok) {
			throw new Error(`Failed to fetch reviews: ${res.statusText}`);
		}

		const data = await res.json();

		// Filter reviews with 4+ star ratings
		const filteredReviews = data.reviews?.filter((review) => review.starRating >= 4) || [];

		return NextResponse.json({ reviews: filteredReviews });
	} catch (error) {
		console.error("Error fetching reviews:", error);
		return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
	}
}
