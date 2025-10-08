import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const ManufacturingSlider = () => {
  const manufacturingProcesses = [
    { name: 'CNC Milling', imageUrl: 'https://placehold.co/600x800/1a1a1a/eab308?text=My+CNC+Work' },
    { name: 'Laser Cutting', imageUrl: 'https://placehold.co/600x800/1a1a1a/eab308?text=Laser+Cutting' },
    { name: '3D Printing', imageUrl: 'https://placehold.co/600x800/1a1a1a/eab308?text=3D+Printing' },
    { name: 'Micro/Nano Fabrication', imageUrl: '/images/micro_nano.jpg' },
    { name: 'Composite Layup', imageUrl: '/images/carbon_fibre.JPG' },
  ];

  return (
    <div className="w-full py-8">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        className="w-full h-[400px] md:h-[500px]"
      >
        {manufacturingProcesses.map((process, index) => (
          <SwiperSlide key={index} className="!w-[300px] md:!w-[400px] bg-cover bg-center rounded-xl overflow-hidden">
            <img src={process.imageUrl} alt={process.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-xl font-bold">{process.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ManufacturingSlider;