import { useEffect, useState } from "react";
import iconNewPerson from "../../../assets/images/new_person.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import StatusCommon, { type User } from "../../../components/StatusCommon";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { userGuestAccount } from "../../../constants/guestInfo";
import { fetchAllGift, loginDirect } from "../apis";
const TAKE = 24;
// @ts-ignore
const fakeUser: User = {
  videoCallWaiting: true,
  in_call: false,
  is_fav: 0,
  voiceCallWaiting: false,
  region: 1,
  userId: "user123",
  age: 30,
  username: "Kyuun",
  receiveCallRequest: false,
};


export const HomePage = () => {
  const [listUserOnline, setListUserOnline] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await loginDirect({
          email: userGuestAccount.email,
          password: userGuestAccount.password,
        });
        // console.log("✅ Token nhận được:", res.token);
        const res_gift = await fetchAllGift({
          req_user_id: res.userId,
          token: res.token,
        });

        console.log("🎁 fetch all gift :", res_gift);
      } catch (error) {
        // console.error("❌ Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    getListUserOnline(0);
  }, []);

  const getListUserOnline = async (skip: number) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`https://dummyjson.com/users?limit=${TAKE}&skip=${skip}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Fetch success:", data.users);
      const newData = data.users || [];
      setListUserOnline((prev) => [...prev, ...newData]);
      setHasLoadMore(newData.length > 0);
    } catch (error) {
      console.error("Fetch error:", error);
      setHasLoadMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    getListUserOnline(listUserOnline.length);
  };

  const handleRedirectUser = () => {
    console.log("Redirect to user profile");
  }

  return (
    <div className="bg-[#F4F4F4] h-[100vh]">
      <div className="pl-[67px] pr-[18px] pt-[158px]">

        <div className="pl-[11px] ">
          <h1 className="border-l-[10px] leading-none border-[#007bff] text-[#000000] text-[28px] font-[600]  pl-[19px] pt-[10px] pb-[10px]">  Kyuun web</h1>
        </div>

        {listUserOnline.length === 0 && !loading ? (
          <div>
            <p>まだありません</p>
          </div>
        ) : (
          <div>
            <InfiniteScroll
              dataLength={listUserOnline.length}
              next={handleLoadMore}
              hasMore={hasLoadMore}
              loader={
                <div>
                  <LoadingSpinner />
                </div>
              }
              scrollableTarget="scrollable_list_user_online"
              className="flex flex-wrap gap-x-[13px] gap-y-[32px] pb-[32px] pt-[25px]"
            >
              {listUserOnline.map((item, index) => {
                return (
                  (
                    <div
                      key={index}
                      className="w-[169px] rounded-[17px] relative bg-gradient-to-b from-[rgba(255,255,255,0)] via-[rgba(255,255,255,0)] to-[#FFFFFF]"
                      onClick={handleRedirectUser}
                    >
                      <div className="absolute left-[6px] top-[6px] text-[10px] text-[#FFFFFF]">
                        <StatusCommon userInfo={fakeUser} />
                      </div>
                      <img
                        src={item.image}
                        alt={`Image ${index + 1}`}
                        className="rounded-[17px] w-[169px] mb-[6px]"
                      />
                      <div className="absolute left-[6px] top-[133px] flex gap-[4px] items-center">
                        <img src={iconNewPerson} alt="icon" />
                        <div className="flex flex-col">
                          <div className="text-[#4D4D4D] font-[700] text-[14px] max-w-[142px] truncate">
                            name user
                          </div>
                          <div className="flex gap-[5px] font-[400] text-[12px] text-[#FFFFFF]">
                            <div>region</div>
                            <div>age</div>
                          </div>
                        </div>
                      </div>
                      <div className="pl-[6px] pr-[7px] pb-[10px] pt-[6px] text-[#665C69] font-[400] text-[8px]">
                        アピールコメントアピールコメントアピールコメントアピールコメントアピールコメント
                      </div>
                    </div>
                  )
                )
              })}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};
