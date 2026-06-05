import { NextResponse } from "next/server"
import { getClientRequestMeta } from "@/lib/moneyfor/client-request-meta"
import { postLeadToMoneyfor } from "@/lib/moneyfor/post-lead"
import type { LeadProxyClientBody } from "@/lib/moneyfor/types"

export async function POST(request: Request) {
  let body: LeadProxyClientBody

  try {
    body = (await request.json()) as LeadProxyClientBody
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    )
  }

  try {
    const result = await postLeadToMoneyfor(body, getClientRequestMeta(request))

    if (!result.ok) {
      return NextResponse.json(result, { status: 502 })
    }

    return NextResponse.json({
      ok: true,
      leadId: result.leadId,
      redirectUrl: result.redirectUrl,
    })
  } catch {
    return NextResponse.json(
      { ok: false, message: "Lead posting is not configured." },
      { status: 500 },
    )
  }
}
