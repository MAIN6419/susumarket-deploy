import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../../../../components/commons/button/Button";

export const FollowerTitle = styled.h2``;

export const FollowerListUl = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 390px;
`;

export const FollowerListLi = styled.li`
  display: flex;
  margin-bottom: 16px;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  &:hover {
    background-color: #f5f5f5;
  }
  &:last-child {
    margin-bottom: 50px;
  }
`;

export const FollowerListLink = styled(Link)`
  display: flex;
  align-items: center;
  max-width: 340px;
`;

export const UserWrapper = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  width: 250px;
  @media screen and (max-width: 361px) {
    width: 200px;
  }
`;

export const UserName = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

export const UserIntro = styled.strong`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  width: 200px;
  color: #767676;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FollowButton = styled(Button)`
  width: 90px;
  padding: 7px 0px !important;
`;
