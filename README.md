# Bikundo Farm Fresh – Website

A mobile-first, premium website for **Bikundo Farm Fresh**, showcasing 35-day broiler chickens for restaurants, vendors, and resellers.

## Quick start

1. Open `index.html` in a browser, or serve the folder with any static server (e.g. `npx serve .`).
2. Set your WhatsApp number in `script.js`: replace `XXXXXXXXXXX` in `WHATSAPP_NUMBER` with your number (e.g. `254712345678` with no + or spaces). All “Order on WhatsApp” buttons will use this.
3. In the Contact section of `index.html`, update the placeholder **Location**, **Phone**, and **Hours** with your real details.

## Project structure

- **index.html** – All sections, Tailwind config, semantic HTML
- **style.css** – Custom colors, section styles, transitions, lightbox
- **script.js** – Smooth scroll, sticky nav, mobile menu, hero animation, scroll reveal, gallery lightbox, scroll-to-top, WhatsApp URL

## Tech stack

- HTML5, TailwindCSS (CDN), jQuery 3.7
- Google Fonts: Poppins, Inter
- Responsive, mobile-first layout

## Customization

- **Colors** – Edit the `theme.extend.colors` in the `<script>` block in `index.html` and the `:root` variables in `style.css` (primary green `#1a5f3c`, secondary gold `#c9a227`).
- **Hero background** – Change the image URL in the `.hero-bg` rule in `style.css`, or replace with your own farm image.
- **Gallery** – Replace the Unsplash URLs in the gallery section with your own photos; ensure each `.gallery-item` has a `data-src` with the full-size image URL for the lightbox.

## Features

- Sticky navigation with scroll state
- Mobile hamburger menu
- Hero fade-in animation
- Scroll-reveal for sections
- Gallery lightbox (click any image)
- Scroll-to-top button
- Single WhatsApp number in `script.js` drives all order links
- Pre-filled WhatsApp message for orders
