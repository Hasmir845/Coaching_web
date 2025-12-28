# Netlify Deploy Guide

## 🚀 Netlify-এ Deploy করার Steps

### Step 1: Build করুন
```bash
npm run build
```

### Step 2: Netlify-এ Deploy করুন

**Option A: Netlify CLI দিয়ে (Recommended)**
```bash
# Netlify CLI install করুন
npm install -g netlify-cli

# Login করুন
netlify login

# Deploy করুন
netlify deploy --prod
```

**Option B: Netlify Dashboard দিয়ে**
1. [Netlify Dashboard](https://app.netlify.com) এ যান
2. **Add new site** → **Deploy manually**
3. `dist` folder drag & drop করুন
4. Deploy!

**Option C: Git Integration (Best)**
1. GitHub/GitLab-এ code push করুন
2. Netlify Dashboard → **Add new site** → **Import from Git**
3. Repository select করুন
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Deploy!

## ⚙️ Configuration Files

### `netlify.toml` (Already Created)
এই file Netlify-কে বলে:
- Build command: `npm run build`
- Publish directory: `dist`
- All routes redirect to `index.html` (SPA routing fix)

### `public/_redirects` (Already Created)
এই file Netlify-এ সব routes-কে `index.html`-এ redirect করে, যাতে:
- `/admin` page refresh করলে 404 error না হয়
- সব client-side routes কাজ করবে

## 🔧 Environment Variables

Netlify Dashboard-এ:
1. **Site settings** → **Environment variables**
2. Add করুন:
   ```
   VITE_API_URL = https://your-backend-url.vercel.app
   ```

## ✅ Testing

Deploy হওয়ার পর test করুন:
1. Main page: `https://your-site.netlify.app`
2. Admin panel: `https://your-site.netlify.app/admin`
3. Admin panel-এ refresh করুন - 404 error হওয়া উচিত না!

## 🐛 Troubleshooting

### Problem: 404 Error on Refresh
**Solution:** 
- `_redirects` file `dist` folder-এ আছে কিনা check করুন
- `netlify.toml` file root-এ আছে কিনা verify করুন

### Problem: API Calls Not Working
**Solution:**
- Environment variable `VITE_API_URL` set করুন
- CORS settings backend-এ check করুন

### Problem: Build Fails
**Solution:**
- `npm run build` local-এ test করুন
- Netlify build logs check করুন

## 📝 Important Notes

1. **Build Command:** `npm run build` (package.json-এ already আছে)
2. **Publish Directory:** `dist` (vite.config.js-এ already set)
3. **Redirects:** `_redirects` file automatically copy হবে `public` folder থেকে
4. **Environment Variables:** Netlify Dashboard-এ set করতে হবে

---

**Happy Deploying! 🎉**

