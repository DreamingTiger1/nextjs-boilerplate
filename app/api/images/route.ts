import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const total = 200;

  return NextResponse.json({
    page,
    limit,
    total,
    images:
      Math.ceil(total / page) >= page
        ? Array.from(
            { length: limit * page > total ? total % limit : limit },
            (_, index) => ({
              url: `https://picsum.photos/300/300?random=${
                index + page * limit
              }`,
              id: index + page * limit,
            })
          )
        : [],
  });
}
