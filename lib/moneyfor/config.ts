/**
 * Mirrors moneyfor lead-forms env (see moneyfor/application/config/parameters/lead-forms.yaml):
 * LEADFORMS_MONEYFOR_CONTRACTS_URL, _API_KEY, _PUBLISHER, _REJECT_ALIAS, …
 *
 * Publisher `name` + apiKey from Monetization → Publishers in moneyfor-admin
 * (e.g. name `nonodebt`, role "API Lead Post"). Use `name`, not display label.
 * CAMPAIGN_ID = campaign alias in admin, not uniqueKey (e.g. not campaign_algorithm_nonodebt_template_v0).
 */

export type MoneyforContractsConfig = {
  apiKey: string
  publisher: string
  campaignId: string
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`${name} is not configured`)
  }
  return value
}

export function getMoneyforContractsConfig(): MoneyforContractsConfig {
  return {
    apiKey: requireEnv("NONODEBT_MONEYFOR_CONTRACTS_API_KEY"),
    publisher: requireEnv("NONODEBT_MONEYFOR_CONTRACTS_PUBLISHER"),
    campaignId: requireEnv("NONODEBT_MONEYFOR_CONTRACTS_CAMPAIGN_ID"),
  }
}

export function getAuthorizationHeader(config: MoneyforContractsConfig): string {
  return `Bearer ${config.publisher}:${config.apiKey}`
}
