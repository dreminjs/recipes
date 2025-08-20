import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { FC } from 'react';
import Image from 'next/image';
import { MINIO_URL } from '@/shared';
interface IProps {
  urls: string[];
}

export const RecipePhotoes: FC<IProps> = ({ urls }) => {
  return (
    <div className="max-w-[280px]">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={8}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {urls.map((el) => (
          <SwiperSlide key={el}>
            <Image
              width={270}
              height={200}
              className="object-cover w-[270px] h-[200px]"
              src={`${MINIO_URL}=${el}`}
              alt={'recipe photo'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
