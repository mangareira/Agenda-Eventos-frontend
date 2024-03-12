import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('placeId')
    const response = await axios.request({
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&language=pt_BR&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    })
    const data = await response.data
    return NextResponse.json(data)
}