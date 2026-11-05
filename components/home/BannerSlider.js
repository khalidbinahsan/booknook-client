"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const unsplash = (id) =>
  `https://images.unsplash.com/${id}?w=1800&q=70&auto=format&fit=crop`;

const slides = [
  {
    eyebrow: "Your neighbourhood library, online",
    title: "Find your next favourite book",
    text: "Browse a growing shelf of novels, science reads, history and stories for kids, all shared by readers like you.",
    image: unsplash("photo-1507842217343-583bb7270b66"),
  },
  {
    eyebrow: "Borrow in one click",
    title: "Borrow today, return when you finish",
    text: "Pick a book, confirm the borrow and it is yours for the days you need. Bring it back with a single tap.",
    image: unsplash("photo-1512820790803-83ca734da794"),
  },
  {
    eyebrow: "Grow the shelf",
    title: "Share the books you have loved",
    text: "Add a book from your own collection so another reader can discover it. Every shelf starts with one book.",
    image: unsplash("photo-1481627834876-b7833e8f5570"),
  },
];

export default function BannerSlider() {
  return (
    <section className="container-x pt-6">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation
        className="banner-swiper overflow-hidden rounded-3xl shadow-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="relative flex min-h-[460px] items-center md:min-h-[540px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/10" />

              <div className="relative max-w-2xl px-6 py-16 sm:px-12 md:px-16 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                  {slide.text}
                </p>
                <Link href="/books" className="btn btn-primary btn-lg mt-8 rounded-full px-8 border-0">
                  Browse Books
                  <FiArrowRight className="size-5" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
