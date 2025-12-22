# ScienceCare একাডেমিক কোচিং - React Version

একটি আধুনিক, ইন্টারেক্টিভ React.js ওয়েবসাইট SSC ও HSC বিজ্ঞান বিভাগের কোচিং সেন্টারের জন্য।

## 🚀 নতুন বৈশিষ্ট্য

### ✨ Enhanced Interactivity
- **Countdown Timer** - বিশেষ অফারের জন্য লাইভ কাউন্টডাউন
- **Testimonials Carousel** - শিক্ষার্থীদের মতামতের স্লাইডার
- **Statistics Counter** - অ্যানিমেটেড সংখ্যা কাউন্টার
- **Enrollment Modal** - ইন্টারেক্টিভ ভর্তি ফর্ম
- **Smooth Animations** - Framer Motion ব্যবহার করে সুন্দর অ্যানিমেশন
- **Interactive Forms** - যোগাযোগ ও ভর্তি ফর্ম

### 🎨 Visual Enhancements
- Modern card designs with hover effects
- Gradient backgrounds and animations
- Interactive icons and buttons
- Responsive design for all devices
- Beautiful color scheme

## 📦 ইনস্টলেশন

### প্রয়োজনীয় সফটওয়্যার
- Node.js (v16 বা তার উপরে)
- npm বা yarn

### ধাপ ১: Dependencies ইনস্টল করুন

```bash
npm install
```

### ধাপ ২: Development Server চালু করুন

```bash
npm run dev
```

ওয়েবসাইটটি `http://localhost:3000` এ খুলবে।

### ধাপ ৩: Production Build তৈরি করুন

```bash
npm run build
```

Build ফাইলগুলো `dist` ফোল্ডারে তৈরি হবে।

## 📁 প্রজেক্ট স্ট্রাকচার

```
Coaching/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Header.jsx
│   │   ├── Statistics.jsx
│   │   ├── Subjects.jsx
│   │   ├── Features.jsx
│   │   ├── Fees.jsx
│   │   ├── CountdownTimer.jsx
│   │   ├── BatchInfo.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   ├── EnrollmentModal.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index-react.html
```

## 🎯 কাস্টমাইজেশন

### যোগাযোগের তথ্য আপডেট

`src/components/Contact.jsx` ফাইলে:

```jsx
<p className="phone-number">01XXXXXXXXX</p> // আপনার নম্বর
```

### ঠিকানা আপডেট

`src/components/Contact.jsx` এবং `src/components/Footer.jsx` ফাইলে ঠিকানা আপডেট করুন।

### Countdown Timer সেট করুন

`src/components/CountdownTimer.jsx` ফাইলে সময় সেট করুন:

```jsx
const [timeLeft, setTimeLeft] = useState({
    days: 7,    // দিন
    hours: 23,  // ঘন্টা
    minutes: 59, // মিনিট
    seconds: 59, // সেকেন্ড
})
```

### Testimonials যোগ করুন

`src/components/Testimonials.jsx` ফাইলে `testimonials` array তে নতুন testimonial যোগ করুন।

### Statistics আপডেট করুন

`src/components/Statistics.jsx` ফাইলে `stats` array আপডেট করুন।

## 🎨 Styling

### রঙ পরিবর্তন

`src/index.css` ফাইলের `:root` সেকশনে:

```css
:root {
    --primary-blue: #1976d2;
    --accent-orange: #ff6b35;
    /* আপনার পছন্দের রঙ */
}
```

## 📱 Responsive Design

ওয়েবসাইটটি সব ডিভাইসে responsive:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Technologies Used

- **React 18** - UI Library
- **Vite** - Build Tool
- **Framer Motion** - Animations
- **React Icons** - Icons
- **CSS3** - Styling

## 📝 Features

### Interactive Components
1. **Navigation** - Smooth scroll navigation with mobile menu
2. **Header** - Animated hero section with badges
3. **Statistics** - Animated counter with numbers
4. **Subjects** - Interactive subject cards
5. **Features** - Hover effects and animations
6. **Fees** - Flip card animations with countdown timer
7. **Testimonials** - Auto-rotating carousel
8. **Contact** - Interactive form with validation
9. **Enrollment Modal** - Popup form for enrollment
10. **Scroll to Top** - Smooth scroll button

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to GitHub Pages
```

## 📞 Support

কোনো সমস্যা হলে বা প্রশ্ন থাকলে:
- Email: your-email@example.com
- Phone: 01XXXXXXXXX

## 📄 License

© ২০২৪ ScienceCare একাডেমিক কোচিং | সকল অধিকার সংরক্ষিত

---

**Note:** এটি React version। Original HTML version `index.html` ফাইলে আছে।

