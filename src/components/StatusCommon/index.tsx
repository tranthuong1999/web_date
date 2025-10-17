import React, { useMemo } from "react";
import iconMess from "../../assets/images/mess-list.svg";
import iconPhone from "../../assets/images/phone-list.svg";
import iconVideo from "../../assets/images/video-recorder-list.svg";
import iconBell from "../../assets/images/bell-list.svg";
export interface User {
  videoCallWaiting: boolean,
  in_call: boolean,
  receiveCallReques: boolean,
  is_fav: number,
  voiceCallWaiting: boolean,
  region: number,
  userId: string,
  age: 30,
  username: string,
  receiveCallRequest: boolean
}

const StatusCommon = ({ userInfo }: { userInfo: User }) => {
  const getUserStatusInfo = (user: User) => {
    if (user.videoCallWaiting && !user.in_call) {
      return {
        icon: iconVideo,
        text: "ビデオ通話OK",
        bgColor: "!bg-[#00C651]",
        textColor: "!text-[#FFFFFF]",
      };
    }
    if (user.voiceCallWaiting && !user.videoCallWaiting && !user.in_call) {
      return {
        icon: iconPhone,
        text: "音声通話OK",
        bgColor: "!bg-[#6100ED]",
        textColor: "!text-[#FFFFFF]",
      };
    }
    if (user.receiveCallRequest && (!user.voiceCallWaiting && !user.videoCallWaiting || user.in_call)) {
      return {
        icon: iconBell,
        text: "通話リクエスト受付中",
        bgColor: "!bg-[#ED008C]",
        textColor: "!text-[#FFFFFF]",
      };
    }
    return {
      icon: iconMess,
      text: "メッセージ待ち",
      bgColor: "!bg-[#FFFFFF]",
      textColor: "!text-[#ED008C]",

    };
  };
  const status = useMemo(() => getUserStatusInfo(userInfo), [userInfo]);

  return (
    <div className={`
        flex items-center font-semibold text-[10px] leading-[18px]
        px-[8px] py-[3px] rounded-[12px] w-fit
        ${status.bgColor} ${status.textColor}
      `}>
      <img src={status.icon} alt="icon" className="width-[12px] height-[12px] mb-[2px] mr-[2px]" />
      <span>
        {status.text}
      </span>
    </div>
  );
};


export default StatusCommon;







