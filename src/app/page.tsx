import Hero from "@/components/Hero/Hero";
import ProductCarousel from "@/components/ProductListing/ProductCarousel";
import ReviewSection from "@/components/Review/ReviewSection";


export default function Page() {
  return (
    
    <>
    <div className="sticky top-0 z-0">
    <Hero></Hero>
    </div>
    <div className="z-30">
    <ProductCarousel/>
    <ReviewSection/>
    </div>
    </>
  );
}
