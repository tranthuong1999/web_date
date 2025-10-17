import React, { useMemo } from "react";
import iconMess from "../../assets/image/message-list.svg";
import iconPhone from "../../assets/image/phone-list.svg";
import iconVideo from "../../assets/image/video-recorder-list.svg";
import iconBell from "../../assets/image/bell-list.svg";


// types.ts
export type UserStatus = 'online' | 'offline' | 'busy' | 'away';

export interface User {
    id: string;
    username: string;        // hiển thị username
    avatarUrl: string;       // ảnh avatar
    region?: string;         // vùng/địa phương
    age?: number;            // tuổi (số)
    status: UserStatus;      // trạng thái online/offline
    isNew?: boolean;         // icon "New" nếu là user mới
    lastLogin?: string;      // ISO string hoặc text hiển thị (ví dụ "2025-10-12T08:34:00Z")
    appealComment?: string;  // appeal comment (text ngắn)
    profileUrl?: string;     // link đến profile/details
    description?: string;    // mô tả ngắn hiển thị ở dưới (nội dung card)
    videoCallWaiting: boolean; // trạng thái chờ video call
    voiceCallWaiting: boolean; // trạng thái chờ voice call
    receiveCallRequest: boolean; // trạng thái nhận call request
    in_call: boolean;           // trạng thái đang trong cuộc gọi
}

const StatusCommon = ({ userInfo }: { userInfo: User }) => {
    const getUserStatusInfo = (user: User) => {
        if (user.videoCallWaiting && !user.in_call) {
            return {
                icon: iconVideo,
                text: "ビデオ通話OK",
                className: "status-videos",
            };
        }
        if (user.voiceCallWaiting && !user.videoCallWaiting && !user.in_call) {
            return {
                icon: iconPhone,
                text: "音声通話OK",
                className: "status-voice",
            };
        }
        if (user.receiveCallRequest && (!user.voiceCallWaiting && !user.videoCallWaiting || user.in_call)) {
            return {
                icon: iconBell,
                text: "通話リクエスト受付中",
                className: "status-request",
            };
        }
        return {
            icon: iconMess,
            text: "メッセージ待ち",
            className: "status-mess",

        };
    };
    const status = useMemo(() => getUserStatusInfo(userInfo), [userInfo]);

    return (
        <div className={`status_wrapper ${status.className}`}>
            <img src={status.icon} alt="icon" className="icon" />
            <span>
                {status.text}
            </span>
        </div>
    );
};


export default StatusCommon;
