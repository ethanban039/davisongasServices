# Davison Gas Services — Website

Static website for Davison Gas Services, a verified Gas Safe engineer (Corgi) based in Nottingham.

## Stack

- Plain HTML / CSS / JavaScript (no build step)
- Inter via Google Fonts
- Hosted on Netlify (or equivalent static host)

## Files

| File | Purpose |
|---|---|
| `index.html` | Homepage — primary SEO target page |
| `services.html` | Services detail page |
| `about.html` | About Darren Davison |
| `reviews.html` | Customer reviews |
| `contact.html` | Contact form and quote request |
| `styles.css` | All site styles |
| `script.js` | Nav, form validation, scroll reveal, FAQ accordion |
| `sitemap.xml` | XML sitemap for Google Search Console |
| `robots.txt` | Crawler instructions with sitemap reference |
| `og-image.jpg` | **PLACEHOLDER** — replace before launch (see below) |

## OG Image

`og-image.jpg` is referenced in the Open Graph and Twitter Card meta tags on every page. The image should be:

- **Dimensions:** 1200 × 630 px
- **Design:** Navy background (`#1a2b4a`), white "Davison Gas Services" wordmark, orange accent (`#f97316`)
- **File size:** Under 300 KB (compress with squoosh.app or similar)

Replace the placeholder reference in every HTML `<head>` once the real image is ready.

---

## Pre-Launch SEO Checklist

- [x] Add `07875 272021` throughout the HTML files and schema markup
- [x] Add `darrentyler7@yahoo.co.uk` throughout the HTML files and schema markup
- [ ] Replace `[GOOGLE BUSINESS PROFILE URL]` in the LocalBusiness JSON-LD schema on `index.html`
- [ ] Replace `[FACEBOOK PAGE URL IF EXISTS]` in the LocalBusiness JSON-LD schema (or remove the entry if no Facebook page exists)
- [ ] Create and replace `og-image.jpg` with a real 1200 × 630 px branded image before launch
- [ ] Submit `sitemap.xml` to Google Search Console after launch
- [ ] Verify LocalBusiness schema passes validation at: https://validator.schema.org
- [ ] Test the page with Google Rich Results Test to confirm FAQ and LocalBusiness rich results are eligible
- [ ] Set up Google Search Console and verify site ownership (HTML tag or DNS method)
- [ ] Set up Google Analytics 4 (GA4) and add the tracking snippet to every page's `<head>`
- [ ] Ensure the Google Business Profile phone number and address **exactly** matches what is on the site
- [ ] Request reviews from existing customers with a direct link to the Google Business Profile review form
- [ ] Add Darren's actual Gas Safe registration number to `about.html` and the schema `hasCredential` field
- [ ] Apply the same footer `<address>`, `role="contentinfo"`, and `role="banner"` updates to `services.html`, `about.html`, `reviews.html`, and `contact.html`
- [ ] Add `aria-label="Contact form"` to the `<form>` element on `contact.html`
