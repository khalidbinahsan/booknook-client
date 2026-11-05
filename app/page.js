import { Suspense } from "react";
import BannerSlider from "@/components/home/BannerSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Reveal from "@/components/shared/Reveal";

// Title comes from the root layout default: "BookNook | Home"
// (a title template only applies to child routes, not the root page)

export default function Home() {
  return (
    <>
      <BannerSlider />

      <section className="container-x py-20">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Fresh on the shelf
          </p>
          <h2 className="section-title mt-2">New Arrivals</h2>
          <p className="section-subtitle">
            The latest books our readers have added. Grab one before someone
            else borrows it.
          </p>
        </Reveal>

        <Suspense fallback={<LoadingSpinner message="Loading the newest books..." />}>
          <NewArrivals />
        </Suspense>
      </section>

      <HowItWorks />
      <TopCategories />
    </>
  );
}
