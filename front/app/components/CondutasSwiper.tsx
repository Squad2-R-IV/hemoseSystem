import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardHeader, CardBody } from "@heroui/react";
import type { ReadCondutaDto } from "~/Dtos/Conduta/ReadCondutaDto";

interface Conduta {
  id: number;
  dt_conduta: string;
  conduta: string;
}

interface CondutasSwiperProps {
  condutas: ReadCondutaDto[];
  renderCondutaText: (conduta: string) => React.ReactNode;
}

const CondutasSwiper: React.FC<CondutasSwiperProps> = ({ condutas, renderCondutaText }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      {condutas.map((conduta, index) => (
        <SwiperSlide className="p-4" key={`${conduta.id}-${index}`}>
          <div className="h-full">
            <Card className="h-full min-h-[200px]">
              <CardHeader>
                <h4 className="font-bold">
                  {new Date(conduta.dt_conduta).toLocaleString()}
                </h4>
              </CardHeader>
              <CardBody>
                {renderCondutaText(conduta.conduta)}
                <p className="text-xs mt-2 text-gray-500">
                  {new Date(conduta.dt_conduta).toLocaleDateString()}
                </p>
              </CardBody>
            </Card>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CondutasSwiper;
