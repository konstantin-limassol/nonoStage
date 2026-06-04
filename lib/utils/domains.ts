import { isProdLocation } from "@/lib/utils/app"

/** Same rules as moneyfor-admin/application/src/common/utils/domains.ts */
export function getDomainMf(): string {
  if (isProdLocation()) {
    return "https://moneyfor.com"
  }

  const customDomain = process.env.NEXT_PUBLIC_DOMAIN_MF
  if (customDomain) {
    return customDomain
  }

  return "https://moneyfor.devpr.net"
}
