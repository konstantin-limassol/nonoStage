export const LEAD_FORM_SECTION_ID = "get-started"

const HEADER_OFFSET_PX = 16

export function scrollToLeadForm() {
  const el = document.getElementById(LEAD_FORM_SECTION_ID)
  if (!el) return

  const header = document.querySelector("header")
  const headerHeight = header?.getBoundingClientRect().height ?? 64
  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    HEADER_OFFSET_PX

  window.scrollTo({ top, behavior: "smooth" })
}

export function handleScrollToLeadForm(
  event: React.MouseEvent<HTMLAnchorElement>,
) {
  event.preventDefault()
  scrollToLeadForm()
  window.history.pushState(null, "", `#${LEAD_FORM_SECTION_ID}`)
}

export function handleMobileScrollToLeadForm(
  event: React.MouseEvent<HTMLAnchorElement>,
  closeMenu: () => void,
) {
  event.preventDefault()
  closeMenu()
  requestAnimationFrame(() => {
    scrollToLeadForm()
    window.history.pushState(null, "", `#${LEAD_FORM_SECTION_ID}`)
  })
}
