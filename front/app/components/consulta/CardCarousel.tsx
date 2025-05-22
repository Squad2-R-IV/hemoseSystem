import React, { type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CardCarouselProps<T> {
  title: string;
  items: T[] | undefined;
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export default function CardCarousel<T>({
  title,
  items,
  renderItem,
  emptyMessage,
  showAddButton = false,
  onAddClick,
}: CardCarouselProps<T>) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold">{title}</h3>
      </CardHeader>
      <CardBody>
        {items && items.length > 0 ? (
          <div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
            >
              {items.map((item, index) => (
                <SwiperSlide className="p-4" key={index}>
                  <div className="h-full">
                    {renderItem(item, index)}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">{emptyMessage}</p>
        )}
        {showAddButton && onAddClick && (
          <div className="flex justify-end mt-4">
            <button
              onClick={onAddClick}
              className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 focus:outline-none"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
