import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connect()

export async function GET(request) {
  try {

    const user = getDataFromToken(request);

    if (!user) {
      return NextResponse.json(
        { isLoggedIn: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { isLoggedIn: true, user },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json(
      { isLoggedIn: false },
      { status: 200 }
    );
  }
}