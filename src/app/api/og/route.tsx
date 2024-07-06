import { ImageResponse } from "next/og";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.has("title");
    const username = searchParams.has("username");
    const postedTime = searchParams.has("createdAt");
    const avatar = searchParams.has("avatar");

    if (!title) {
      return new ImageResponse(
        (
          <div
            style={{
              backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIiPjxjaXJjbGUgZmlsbD0iIzAwMCIgaWQ9InBhdHRlcm4tY2lyY2xlIiBjeD0iMTAiIGN5PSIxMCIgcj0iMS42MjU3NDEzMzgwNTAxNTE4Ij48L2NpcmNsZT48L3N2Zz4=")`,
              backgroundRepeat: "repeat",
              backgroundSize: "32px 32px",
              height: "100%",
              width: "100%",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              flexWrap: "nowrap",
            }}
          >
            <h1
              style={{ fontSize: "56px", fontWeight: "bold", color: "white" }}
            >
              Today I learned
            </h1>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgaWQ9InBhdHRlcm4tY2lyY2xlIiBjeD0iMTAiIGN5PSIxMCIgcj0iMS42MjU3NDEzMzgwNTAxNTE4Ij48L2NpcmNsZT48L3N2Zz4=")`,
            backgroundRepeat: "repeat",
            backgroundSize: "8px 8px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            gap: "28px",
            fontWeight: "bolder",
            backgroundColor: "black",
            color: "white",
            padding: "0px 20px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              textWrap: "pretty",
            }}
          >
            {title ? searchParams.get("title") : ""}
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {avatar && (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <img
                  width="40"
                  height="40"
                  src={searchParams.get("avatar") ?? ""}
                  style={{
                    borderRadius: 128,
                  }}
                />
              </div>
            )}

            {username && <p>{searchParams.get("username")}</p>}
            {postedTime && <p>{searchParams.get("createdAt")}</p>}
          </div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bolder",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <span>todayilearned.xyz</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
              <path d="m21 3-9 9" />
              <path d="M15 3h6v6" />
            </svg>
          </p>
        </div>
      )
    );
  } catch (e) {
    return new Response("Error generating image", { status: 500 });
  }
}
