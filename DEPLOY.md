# Taking KagajSewa live on GitHub Pages

Target: **https://kagajsewa.com** (and `www.kagajsewa.com` redirecting to it).

Work through this in order. Steps 1–6 get the site live. Step 7 onward is DNS,
which is the part that takes waiting rather than doing.

---

## Step 0 — Set your phone number first

The site currently shows `+977 98XX-XXXXXX`. Do not publish a service business with
a placeholder phone number.

Open `src/data/site.js` and edit these four lines:

```js
phoneDisplay:   '+977 98XXXXXXXX',   // shown to Nepali visitors
phoneDisplayEn: '+977 98XXXXXXXX',   // shown to English visitors
phoneDial:      '+97798XXXXXXXX',    // tap-to-call: country code + digits, NO spaces or dashes
whatsapp:       '97798XXXXXXXX',     // wa.me number: digits only, NO + and NO spaces
```

The two `Display` values are cosmetic — format them however you like.
`phoneDial` and `whatsapp` must be digits only or the links break.

While you are in that file, confirm:

```js
siteUrl:      'https://kagajsewa.com',   // no trailing slash
customDomain: 'kagajsewa.com',           // writes the CNAME file
email:        '368shahpiyush@gmail.com'  // change if you want a business address
```

---

## Step 1 — Build in deploy mode

Open a terminal in `C:\Users\Piyush\Documents\KagajSewa` and run:

```powershell
npm run build
```

You should see:

```
MODE: deploy — clean URLs like /services/. This is what you push to GitHub.
126 pages · 24 services · 14 guides · 11 categories
```

**If it says `MODE: local`, run `npm run build` again** — the local build produces
`/services/index.html` URLs that do not match the canonical tags.

The build also warns you if the phone number is still a placeholder. Do not
continue past that warning.

---

## Step 2 — Set up git (first time only)

```powershell
git config --global user.name "Piyush Shah"
git config --global user.email "368shahpiyush@gmail.com"
```

Use the same email as your GitHub account so commits are attributed to you.

---

## Step 3 — Create the repository on GitHub

1. Go to <https://github.com/new>
2. **Repository name:** `kagajsewa`
3. **Visibility:** Public
   *(GitHub Pages needs a paid plan to serve from a private repo.)*
4. **Do not** tick "Add a README", "Add .gitignore" or "Choose a license" — the
   folder already has files and an initialised repo will cause a merge conflict.
5. Click **Create repository**

Leave that page open. You will need the URL from it in the next step.

---

## Step 4 — Push your files

In the same terminal, in the KagajSewa folder:

```powershell
git init
git add .
git commit -m "KagajSewa site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kagajsewa.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

**On the push, a browser window will ask you to sign in to GitHub.** Sign in and
authorise it. If you get a password prompt in the terminal instead, that will fail —
GitHub stopped accepting passwords for git in 2021. Install
[Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager)
or use a personal access token as the password.

### Easier alternative

If any of that gives you trouble, [GitHub Desktop](https://desktop.github.com/)
does the same thing with buttons: **File → Add Local Repository →** point it at the
KagajSewa folder **→ Publish repository**.

---

## Step 5 — Turn on GitHub Pages

1. In your repo on GitHub: **Settings** (top bar) → **Pages** (left sidebar)
2. Under *Build and deployment*:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/ (root)`
3. Click **Save**

Wait one to two minutes. Refresh the page and you should see a live link like
`https://your-username.github.io/kagajsewa/`.

**Open it and check the site works there before touching DNS.** Fonts, layout,
clicking into a service page. If something is wrong, it is far easier to diagnose
now than after DNS is involved.

> The site will look correct at this subpath because every link is relative.
> You do not need to set `basePath` for this.

---

## Step 6 — Attach your domain in GitHub

Still in **Settings → Pages**, under *Custom domain*:

1. Type `kagajsewa.com`
2. Click **Save**

GitHub will say the DNS check is in progress and show a warning. That is expected —
you have not pointed the domain at GitHub yet. That is the next step.

> Your repo already contains a `CNAME` file with `kagajsewa.com` in it, and the build
> regenerates it every time. This matters: if `CNAME` ever vanishes from a push,
> GitHub silently un-sets your custom domain and the site falls back to the
> `github.io` address.

---

## Step 7 — Point the domain at GitHub (DNS)

Log in to the registrar where you bought `kagajsewa.com` and open its DNS settings.
On **Namecheap** that is *Domain List → Manage → Advanced DNS*.

Delete any existing records for `@` and `www` that the registrar added by default
(Namecheap adds a "parking page" URL redirect record — remove it), then add these.

### Four A records — for the bare domain

| Type | Host | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Automatic |
| A | `@` | `185.199.109.153` | Automatic |
| A | `@` | `185.199.110.153` | Automatic |
| A | `@` | `185.199.111.153` | Automatic |

All four. They are GitHub's load-balanced servers, not alternatives to pick between.

### Four AAAA records — IPv6, recommended

| Type | Host | Value |
|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Skip these if your registrar makes them awkward — the site works on IPv4 alone —
but plenty of mobile networks in Nepal are IPv6, so they are worth adding.

### One CNAME record — for www

| Type | Host | Value |
|---|---|---|
| CNAME | `www` | `YOUR-USERNAME.github.io.` |

Your GitHub username, `.github.io`, **not** the repository name. Some registrars
want a trailing dot, some add it themselves.

> These IP addresses are GitHub's published set and have been stable for years, but
> confirm them against
> <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
> before you type them in. If GitHub ever changes them, that page is the source of truth.

---

## Step 8 — Wait, then enforce HTTPS

DNS changes take anywhere from ten minutes to a few hours to propagate. Usually
under an hour.

Check progress at <https://dnschecker.org> — enter `kagajsewa.com`, choose `A`, and
watch for the GitHub IPs appearing worldwide.

Once `https://kagajsewa.com` loads your site:

1. Go back to **Settings → Pages**
2. The custom domain should now show a green tick
3. Tick **Enforce HTTPS**

The certificate can take up to another hour to issue. If the checkbox is greyed out,
DNS has not fully propagated yet — wait and come back. Do not remove and re-add the
domain to try to force it; that resets the certificate request.

---

## Step 9 — Verify it properly

Open each of these and confirm they work:

- `https://kagajsewa.com` — Nepali homepage, correct fonts and layout
- `https://www.kagajsewa.com` — redirects to the bare domain
- `https://kagajsewa.com/en/` — English homepage
- `https://kagajsewa.com/services/annual-company-update/single-shareholder/` — a deep page
- `https://kagajsewa.com/sitemap.xml` — XML, 124 URLs
- `https://kagajsewa.com/robots.txt` — plain text
- `https://kagajsewa.com/nonsense` — your 404 page, not GitHub's

Then, on your phone:

- the sticky bottom bar appears
- tapping the phone icon opens your dialler with the right number
- tapping WhatsApp opens a chat with the right number
- the नेपाली / EN switch works

---

## Step 10 — Tell Google it exists

1. Go to <https://search.google.com/search-console>
2. Add a property → **Domain** → `kagajsewa.com`
3. Verify by adding the `TXT` record it gives you at your registrar
4. Once verified: **Sitemaps** → submit `sitemap.xml`
5. Use **URL Inspection** on your homepage → *Request indexing*

Indexing takes days to weeks. This is normal and there is no way to rush it.

---

## Making changes later

The whole cycle, every time:

```powershell
# 1. edit files in src/  (never edit the generated files in the root)
npm run build

# 2. check it locally if you want
npm run serve          # then open http://localhost:4173

# 3. ship it
git add .
git commit -m "describe what changed"
git push
```

The live site updates about a minute after the push.

**Only ever edit `src/`.** Everything in the repo root — `index.html`, `services/`,
`guides/`, `en/`, `assets/`, `sitemap.xml` — is generated and gets overwritten on
every build.

---

## When something goes wrong

**Site loads but has no styling.** You are opening the file directly instead of over
HTTP. Use `npm run serve`, or `npm run build:local` if you want to browse the files
offline.

**404 on every page except the homepage.** The `.nojekyll` file is missing. It should
be in the repo root — the build creates it. Check it was committed:
`git ls-files .nojekyll`

**Custom domain keeps un-setting itself.** The `CNAME` file is not reaching GitHub.
Run `git ls-files CNAME` — if nothing prints, it is being ignored. Check `.gitignore`.

**"Enforce HTTPS" stays greyed out.** DNS has not propagated. Wait. If it is still
grey after 24 hours, one of the A records is wrong or the old parking record is still
there.

**Pushed but the site did not change.** Look at the **Actions** tab in your repo for a
failed deployment. Also confirm you actually committed the generated files —
`git status` should be clean after a build and commit.

**Nepali text shows as boxes.** The Google Fonts stylesheet did not load. Check the
browser console for a blocked request. The site is readable without it but will fall
back to a system Devanagari font.

---

## One decision before you launch

The site currently promises: *if a document we prepared is rejected because of our
error, we fix it free and refund our fee.* It is on `/why-kagajsewa/`, the homepage
and the refund policy.

It is the strongest thing on the site and neither competitor offers it. It also
commits you to keeping formats current. Decide now whether you will honour it — and
if not, remove it from `src/data/ui.js` (the `why` array) and `src/data/ui.js`
(`legal` → `refund-policy`) before you go live, not after someone claims it.
