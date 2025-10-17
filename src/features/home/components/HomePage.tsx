import { useEffect, useState } from "react";
import iconNewPerson from "../../../assets/images/new_person.svg";
import InfiniteScroll from "react-infinite-scroll-component";


const TAKE = 100;


export const HomePage = () => {
  const [listImage, setListImage] = useState<string[]>([]);

  const [listUserOnline, setListUserOnline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=1000")
      .then((res) => res.json())
      .then((data) => {
        const images = data.results.map((user: any) => user.picture.large);
        setListImage(images);
      });
  }, []);


  // const getListUserOnline = (skip : number) => {
  //   if (loading) return;
  //   setLoading(true);
  //   ListLikeService.getListLikeDetailPost(skip, TAKE)
  //     .then((response) => {
  //       const setListUserOnline = response.data || [];
  //       setListLikeDetailPost((prev) => [...prev, ...newData]);
  //       setHasLoadMore(listUserOnline.length > 0);
  //     })
  //     .catch((error) => setHasLoadMore(false))
  //     .finally(() => setLoading(false));
  // };

  // const handleLoadMore = () => {
  //   getListUserOnline(listUserOnline.length);
  // };

  return (
    <div className="pl-[67px] pr-[18px] pt-[158px] bg-[#F4F4F4]">
      {/* <div className="pl-[11px] ">
        <div className="border-[10px]"> </div>
        <h1 className="text-[28px] font-[600] leading-none text-[#000000] pb-[24px] pl-[19px] border-l-[10px] border-[#007bff]">
          Kyuun web
        </h1>
      </div> */}
      <div className="pl-[11px] ">
        <h1 className="text-[28px] font-[600] leading-none text-[#000000] pb-[24px] pl-[19px] border-l-[10px] border-[#007bff]">
          Kyuun web
        </h1>
      </div>



      {/* user list */}
      <div className="flex flex-wrap gap-x-[13px] gap-y-[32px]">
        {listImage.map((item, index) => (
          <div
            key={index}
            className="w-[169px] rounded-[17px] relative bg-gradient-to-b from-[rgba(255,255,255,0)] via-[rgba(255,255,255,0)] to-[#FFFFFF]"
          >
            {/* status */}
            <div className="absolute left-[6px] top-[6px] text-[10px] text-white">
              status
            </div>

            {/* user image */}
            <img
              src={item}
              alt={`Image ${index + 1}`}
              className="rounded-[17px] w-[169px] mb-[6px]"
            />

            {/* user info */}
            <div className="absolute left-[6px] top-[133px] flex gap-[4px] items-center">
              <img src={iconNewPerson} alt="icon" />
              <div className="flex flex-col">
                <div className="text-[#4D4D4D] font-[700] text-[14px] max-w-[142px] truncate">
                  name user
                </div>
                <div className="flex gap-[5px] font-[400] text-[12px] text-white">
                  <div>region</div>
                  <div>age</div>
                </div>
              </div>
            </div>

            {/* comment */}
            <div className="pl-[6px] pr-[7px] pb-[10px] pt-[6px] text-[#665C69] font-[400] text-[8px]">
              アピールコメントアピールコメントアピールコメントアピールコメントアピールコメント
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
