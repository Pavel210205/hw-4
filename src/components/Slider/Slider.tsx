import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import s from './Slider.module.scss';

interface SliderProps {
  children: React.ReactNode;
}

export default function Slider({ children }: SliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation={true}
      spaceBetween={50}
      slidesPerView={1}
    >
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
      <SwiperSlide>{children}</SwiperSlide>
    </Swiper>
  );
}
