import React, { useState } from "react";
import {
  FollowerListLi,
  FollowerListLink,
  UserWrapper,
  UserName,
  UserIntro,
  FollowButton,
} from "./followerList.style";
import DefaultImg from "../../../../img/basic-profile.svg";

import { addFollowAPI } from "./addFollowAPI";
import { deleteFollowAPI } from "./deleteFollowAPI";

const defaultImage = DefaultImg;
export default function FollowerList({ follower, account }) {
  const [isFollow, setIsFollow] = useState(follower.isfollow);

  // 팔로워 추가 API호출
  const handleSubmitFollow = async () => {
    await addFollowAPI(follower.accountname);
    setIsFollow(true);
  };

  // 팔로워 삭제 API호출
  const handleSubmitUnFollow = async () => {
    await deleteFollowAPI(follower.accountname);
    setIsFollow(false);
  };

  // 버튼 클릭시 발생하는 함수
  const handleFollowBtn = (e) => {
    e.preventDefault();
    if (isFollow) {
      handleSubmitUnFollow();
    } else {
      handleSubmitFollow();
    }
  };

  return (
    <FollowerListLi>
      <FollowerListLink to={`/profile/${follower.accountname}`}>
        <img
          src={
            follower.image.endsWith("Ellipse.png")
            ? defaultImage
            : follower.image
          }
          onError={(e) => (e.target.src = DefaultImg)}
          alt="프로필 이미지"
          style={{
            objectFit: "cover",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
        <UserWrapper>
          <UserName>{follower.username}</UserName>
          <UserIntro>{follower.intro}</UserIntro>
        </UserWrapper>
      </FollowerListLink>
      {follower.accountname !== account && (
        <FollowButton
          className="small"
          active={!isFollow}
          onClick={handleFollowBtn}
        >
          {isFollow ? "취소" : "팔로우"}
        </FollowButton>
      )}
    </FollowerListLi>
  );
}
