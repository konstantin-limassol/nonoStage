import { LEAD_POST_TIMEOUT_MS } from "@/lib/moneyfor/constants"
import {
  getAuthorizationHeader,
  getMoneyforContractsConfig,
} from "@/lib/moneyfor/config"
import { fetchToMf } from "@/lib/moneyfor/fetch-to-mf"
import {
  buildHardOfferRedirectUrl,
  correlationIdFromFetchError,
  correlationIdFromHttpResponse,
  correlationIdFromMfReject,
} from "@/lib/moneyfor/hard-offer-url"
import { MF_LEAD_POST_PATH } from "@/lib/moneyfor/proxy"
import type {
  LeadClientMeta,
  LeadProxyClientBody,
  MoneyforLeadPostResponse,
} from "@/lib/moneyfor/types"
import { mapFormToMoneyforLeadData } from "@/lib/moneyfor/map-form-to-lead-data"

export type PostLeadResult =
  | { ok: true; leadId: string; redirectUrl: string }
  | { ok: false; message: string }

function hardOfferResult(
  publisher: string,
  correlationId: string,
  leadId = "",
): PostLeadResult {
  return {
    ok: true,
    leadId,
    redirectUrl: buildHardOfferRedirectUrl(correlationId, publisher),
  }
}

export async function postLeadToMoneyfor(
  body: LeadProxyClientBody,
  clientMeta: LeadClientMeta = {},
): Promise<PostLeadResult> {
  const config = getMoneyforContractsConfig()

  const payload = {
    campaignId: config.campaignId,
    leadData: mapFormToMoneyforLeadData(
      {
        debtAmount: body.debtAmount,
        debtType: body.debtType,
        state: body.state,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
      },
      clientMeta,
    ),
    source: config.publisher,
    ...(body.subId1 ? { subId1: body.subId1 } : {}),
    ...(body.pathName ? { pathName: body.pathName } : {}),
  }

  let response: Response
  try {
    response = await fetchToMf({
      path: MF_LEAD_POST_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorizationHeader(config),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(LEAD_POST_TIMEOUT_MS),
    })
  } catch (error) {
    return hardOfferResult(
      config.publisher,
      correlationIdFromFetchError(error),
    )
  }

  if (!response.ok) {
    return hardOfferResult(
      config.publisher,
      correlationIdFromHttpResponse(response),
    )
  }

  let result: MoneyforLeadPostResponse
  try {
    result = (await response.json()) as MoneyforLeadPostResponse
  } catch {
    return hardOfferResult(
      config.publisher,
      correlationIdFromHttpResponse(response),
    )
  }

  if (
    result.status === "accepted" &&
    typeof result.redirectURL === "string" &&
    result.redirectURL.length > 0
  ) {
    return {
      ok: true,
      leadId: result.leadId,
      redirectUrl: result.redirectURL,
    }
  }

  const leadId = result.leadId ?? ""
  return hardOfferResult(
    config.publisher,
    correlationIdFromMfReject(leadId),
    leadId,
  )
}
