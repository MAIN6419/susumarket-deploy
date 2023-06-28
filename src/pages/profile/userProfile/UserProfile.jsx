import React, { useCallback, useContext, useEffect, useState } from "react";
import ProfileInfo from "../../../components/units/profile/profileInfo/ProfileInfo";
import ProfileProduct from "../../../components/units/profile/ProfileProduct/ProfileProduct";
import PostModal from "../../../components/commons/postModal/PostModal";
import ConfirmModal from "../../../components/commons/confirmModal/confirmModal";
import TopButton from "../../../components/commons/topButton/TopButton";
import { useNavigate, useParams } from "react-router-dom";
import { ModalContext } from "../../../context/ModalContext";
import { UserContext } from "../../../context/UserContext";
import ProfilePost from "../../../components/units/profile/ProfilePost/ProfilePost";
import { customAxios } from "../../../library/customAxios";
import {
  UserProfileWrapper,
  UserUndefinedImg,
  UserUndefinedText,
  UserUndefinedWrapper,
} from "./userProfile.styles";
import undefindImg from "../../../img/symbol-logo-404.svg";
import NewTopHeader from "../../../components/commons/newTopHeader/NewTopHeader";
import { AccountContext } from "../../../context/AccountContext";
import useAuth from "../../../hook/useAuth";
import MenuBar from "../../../components/commons/menuBar/MenuBar";
import Loading from "../../../components/commons/loading/Loading";
export default function UserProfile() {
  const { setAccessToken } = useContext(UserContext);
  const { setIsOpenPostModal, setIsOpenConfirmModal } =
    useContext(ModalContext);
  const navigate = useNavigate();
  const params = useParams();
  const accountname = params.userId;

  // confirm 모달창 props 설정 => 버튼 마다 confirm 모달창이 달라지기 때문에 사용
  const [confirmProps, setConfirmProps] = useState({});
  // post 모달창 props 설정 => 버튼 마다 post 모달창이 달라지기 때문에 사용
  const [postModalProps, setPostModalProps] = useState([]);

  // 유저 데이터 저장
  const [userData, setUserData] = useState({});

  // 유효한 유저 인지 파악
  const [isInvalidProfile, setIsInvalidProfile] = useState(false);

  // account 상태
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  // 자신의 프로필 정보를 가져오는 커스텀 훅
  const myProfile = useAuth(null);

  // post 모달창 props 설정 및 열기
  function settingPostModalProps(modalProps) {
    setPostModalProps(modalProps);
    setIsOpenPostModal(true);
  }

  // postModal 창에 버튼을 누를경우 confirm 모달창의 props를 넘겨줌
  const onClickButton = useCallback(
    (confirmMessage, submitMessage, handleSubmit) => {
      setConfirmProps({ confirmMessage, submitMessage, handleSubmit });
      setIsOpenConfirmModal(true);
    },
    [],
  );

  // 모달창을 닫는 함수
  const closeModal = useCallback(() => {
    setIsOpenConfirmModal(false);
    setIsOpenPostModal(false);
  }, []);

  const fecthUserDate = useCallback(async () => {
    try {
      // accountname params가 존재할때 와 존재하지 않을때를 분기처리해줌
      // accountname이 존재할 시 accountname과 일치하는 유저 프로필을 불러옴
      if (accountname) {
        const response = await customAxios.get(`profile/${accountname}`);
        setUserData(response.data.profile);
        setIsInvalidProfile(false);
        setLoading(false); // Set loading to false when data is fetched
      } else {
        // accountname이 존재하지 않을 시에는 자신의 프로필 정보를 불러옴
        setUserData(myProfile);
        setLoading(false); // Set loading to false when data is fetched
      }
    } catch (error) {
      setIsInvalidProfile(true);
      console.log(error);
    }
  }, [myProfile, accountname]);

  // 유저 정보가 있을 경우에만 유저 데이터를 받아옴
  useEffect(() => {
    if (myProfile) {
      setAccount(myProfile.accountname);
      fecthUserDate();
    }
  }, [myProfile, accountname]);

  if (loading) {
    return <Loading />;
  }
  return (
    // userData.accountname undeifined 방지

    userData.accountname && (
      <AccountContext.Provider value={{ setAccount, account }}>
        <NewTopHeader
          left={"back"}
          right={"more"}
          title={"유저 프로필"}
          onClickButton={() => {
            settingPostModalProps([
              {
                name: "로그아웃",
                func: () =>
                  onClickButton(
                    "정말 로그아웃 하시겠습니까?",
                    "로그아웃",
                    () => {
                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("account");
                      setAccessToken(null);
                      setAccount(null);
                      closeModal();
                      navigate("/login");
                    },
                  ),
              },
              {
                name: "설정 및 개인 정보",
                func: () => {
                  closeModal();
                  navigate("/profile/test/edit");
                },
              },
            ]);
          }}
        />
        <UserProfileWrapper>
          {isInvalidProfile ? (
            <UserUndefinedWrapper>
              <UserUndefinedImg src={undefindImg} alt="존재하지 않는 유저" />
              <UserUndefinedText>
                유효하지 않은 프로필 입니다.
              </UserUndefinedText>
            </UserUndefinedWrapper>
          ) : (
            <>
              <ProfileInfo
                userData={userData}
                reFetchUserData={fecthUserDate}
              />
              <ProfileProduct
                onClickButton={onClickButton}
                settingPostModalProps={settingPostModalProps}
                closeModal={closeModal}
                userData={userData}
              />
              <ProfilePost
                onClickButton={onClickButton}
                settingPostModalProps={settingPostModalProps}
                closeModal={closeModal}
                userData={userData}
                isFeed={false}
              />
            </>
          )}
          <PostModal menuList={postModalProps} />
          <ConfirmModal
            confirmMessage={confirmProps.confirmMessage}
            submitMessage={confirmProps.submitMessage}
            cancelMessage="취소"
            handleSubmit={confirmProps.handleSubmit}
          />
        </UserProfileWrapper>
        <TopButton />
        <MenuBar />
      </AccountContext.Provider>
    )
  );
}
