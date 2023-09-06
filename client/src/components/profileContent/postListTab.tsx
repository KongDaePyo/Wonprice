import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";
import axios from "axios";

interface products {
  productId: number;
  title: string;
  createAt: string;
  img: string;
}

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  .postlistMenuContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .postlistTabMenu {
      width: calc(100% / 3);
      border: 1px solid ${COLOR.gray_300};
      border-radius: 6px 6px 0 0;
      padding: 0.5rem 0.75rem;
      font-size: ${FONT_SIZE.font_16};
      &:hover {
        background-color: ${COLOR.primary};
      }
      &.select {
        font-weight: bold;
        background-color: ${COLOR.secondary};
      }
    }
  }
`;

const PostListTab = (): JSX.Element => {
  const tabmenu = [
    { value: "cell", text: "판매글 목록" },
    { value: "leaveReview", text: "작성한 거래 후기" },
    { value: "getReview", text: "받은 거래 후기" },
  ];
  const [cellPost, setCellPost] = useState<products[]>([]);
  const [menu, setMenu] = useState("cell");
  const getPostlist = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/members/myPage/products`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setCellPost(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error);
        }
      }
    }
  };
  useEffect(() => {
    getPostlist();
  }, []);
  return (
    <PostListContainer>
      <ul className="postlistMenuContainer">
        {tabmenu.map((el) => (
          <li
            key={el.value}
            className={menu === el.value ? "select postlistTabMenu" : "postlistTabMenu"}
            onClick={() => setMenu(el.value)}
          >
            {el.text}
          </li>
        ))}
      </ul>
      <div className="tabContent">
        {menu === "cell" &&
          cellPost.map((el) => (
            <div key={el.productId}>
              <img src={el.img}></img>
              <div>
                <div className="postTitle">{el.title}</div>
                <div className="createdAt">{el.createAt}</div>
              </div>
            </div>
          ))}
        {menu === "leaveReview" && (
          <div>
            <img></img>
            <div>
              <div className="postTitle"></div>
              <div className="productName"></div>
              <div>
                <span className="author"></span>
                <span className="createdAt"></span>
              </div>
              <p className="postContent"></p>
            </div>
          </div>
        )}
        {menu === "getReview" && (
          <div>
            <img></img>
            <div>
              <div className="postTitle"></div>
              <div className="productName"></div>
              <div>
                <span className="author"></span>
                <span className="createdAt"></span>
              </div>
              <p className="postContent"></p>
            </div>
          </div>
        )}
      </div>
    </PostListContainer>
  );
};

export default PostListTab;
