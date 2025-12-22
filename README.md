# ScienceCare একাডেমিক কোচিং

একটি আধুনিক, ইন্টারেক্টিভ ও সুন্দর ওয়েবসাইট SSC ও HSC বিজ্ঞান বিভাগের কোচিং সেন্টারের জন্য।

## ফাইলসমূহ

- `index.html` - মূল HTML ফাইল
- `styles.css` - CSS স্টাইল ফাইল
- `script.js` - JavaScript ইন্টারেক্টিভিটি ফাইল

## ব্যবহার

1. `index.html` ফাইলটি ব্রাউজারে খুলুন
2. যোগাযোগের তথ্য (ঠিকানা ও মোবাইল নম্বর) আপডেট করুন
3. হেডারে ছবি যোগ করুন (ঐচ্ছিক)

## বৈশিষ্ট্য

- ✅ সম্পূর্ণ বাংলা ভাষা সমর্থন
- ✅ নীল ও সাদা রঙের থিম
- ✅ আধুনিক ও ইন্টারেক্টিভ ডিজাইন
- ✅ মোবাইল-বান্ধব (Responsive)
- ✅ সহজপাঠ্য বাংলা ফন্ট
- ✅ Smooth scrolling এবং animations
- ✅ Interactive hover effects
- ✅ Scroll to top button
- ✅ Mobile-friendly navigation
- ✅ Highlight points এবং call-to-action buttons
- ✅ Beautiful card designs with icons

## কাস্টমাইজেশন

### যোগাযোগের তথ্য আপডেট

`index.html` ফাইলে যোগাযোগ সেকশনে:

```html
<div class="contact-card">
    <strong>ঠিকানা:</strong> আপনার সম্পূর্ণ ঠিকানা এখানে লিখুন
</div>
<div class="contact-card">
    <strong>মোবাইল:</strong> 01XXXXXXXXX (আপনার নম্বর)
</div>
```

### ছবি যোগ করা

হেডার সেকশনে ছবি যোগ করতে, `.image-placeholder` div টি replace করুন:

```html
<div class="header-image">
    <img src="images/your-image.jpg" alt="ScienceCare কোচিং" style="width: 100%; border-radius: 15px;">
</div>
```

একটি `images` ফোল্ডার তৈরি করুন এবং সেখানে আপনার প্রতিষ্ঠানের ছবি রাখুন।

### রঙ পরিবর্তন

`styles.css` ফাইলের `:root` সেকশনে রঙ পরিবর্তন করতে পারেন:

```css
:root {
    --primary-blue: #1976d2;
    --accent-orange: #ff6b35;
    /* আপনার পছন্দের রঙ যোগ করুন */
}
```

## ব্রাউজার সমর্থন

- Chrome (সর্বশেষ)
- Firefox (সর্বশেষ)
- Safari (সর্বশেষ)
- Edge (সর্বশেষ)
- Mobile browsers

## নোট

- Font Awesome icons ব্যবহার করা হয়েছে
- Google Fonts (Noto Sans Bengali) ব্যবহার করা হয়েছে
- সব modern browser এ কাজ করবে

