import React, { useCallback, useEffect, useState } from "react";
import {
  ProfileProductTitle,
  ProfileProductUl,
  ProfileProductWrapper,
} from "./ProfileProduct.styles";
import ProfileProductList from "./ProfileProductList";
import {
  PostNoneImg,
  PostNoneText,
  PostNoneWrapper,
} from "../../../../components/commons/postList/postList.styles";
import ProductNoneImgIcon from "../../../../img/symbol-logo-404.svg";
import productNoneImgIconWebp from "../../../../img/webp/symbol-logo-404.webp";
import { productListAPI } from "../../../../API/productAPI";
import { resolveWebp } from "../../../../library/checkWebpSupport";

export default function ProfileProduct({
  onClickButton,
  settingPostModalProps,
  closeModal,
  userData,
}) {
  const [productData, setProductData] = useState([]);
  const [isNoneProductData, setIsNoneProductData] = useState(false);

  const fetchProdcutData = useCallback(async () => {
    const response = await productListAPI(userData.accountname);
    setProductData(response);
    if (response.length === 0) {
      setIsNoneProductData(true);
    } else {
      setIsNoneProductData(false);
    }
  }, [userData]);

  useEffect(() => {
    if (userData.accountname) {
      fetchProdcutData();
    }
  }, [userData]);
  return (
    <ProfileProductWrapper>
      <ProfileProductTitle>판매 중인 상품</ProfileProductTitle>
      {isNoneProductData ? (
        <PostNoneWrapper>
          <PostNoneImg
            src={resolveWebp(productNoneImgIconWebp, ProductNoneImgIcon)}
            alt="게시물 없음 아이콘"
          />
          <PostNoneText>현재 판매 중인 상품이 없어요.</PostNoneText>
        </PostNoneWrapper>
      ) : (
        <ProfileProductUl>
          {productData &&
            productData.map((product) => {
              return (
                <ProfileProductList
                  key={product.id}
                  onClickButton={onClickButton}
                  settingPostModalProps={settingPostModalProps}
                  closeModal={closeModal}
                  productList={product}
                  setProductData={setProductData}
                />
              );
            })}
        </ProfileProductUl>
      )}
    </ProfileProductWrapper>
  );
}
