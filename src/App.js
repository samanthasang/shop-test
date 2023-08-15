import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Card, Divider, Menu } from "antd";
import Logo from "../src/assets/image_1.svg";
import LogoFooter from "../src/assets/image_2.svg";
import shop from "../src/assets/shop.svg";
import back from "../src/assets/back.svg";
import telegram from "../src/assets/telegram.svg";
import instagram from "../src/assets/instagram.svg";
import aparat from "../src/assets/aparat.svg";
import plus from "../src/assets/plus.svg";
import minus from "../src/assets/minus.svg";
import trash from "../src/assets/trash.svg";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItemsCount,
  selectCartTotal,
} from "./redux/cart/cart.selectors";
import {
  addItem,
  clearItemFromCart,
  removeItem,
  toggleCartHidden,
} from "./redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";

function App() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("10");
  const [itemsg, setItemsg] = useState("");
  const [itemsgcat, setItemsgcat] = useState("");
  const [itemsgh, setItemsgh] = useState([]);
  const [items, setItems] = useState("");

  const t = useSelector(
    createStructuredSelector({
      cartItems: selectCartItemsCount,
      total: selectCartTotal,
    })
  );
  const cartItems = useSelector((state) => state.cart.cartItems);
  const hiddenCartItems = useSelector((state) => state.cart.hidden);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    getmeucat(e.key);
    setItems("");
  };
  const onClicklogo = (e) => {
    setItemsgh("");
    setItems("");
    getmeucat();
    setItemsgcat("");
  };
  const onClickcat = (id) => {
    console.log("click ", id);
    setCurrent(id);
    apiCallGet(id);
    getmeucat(id);
  };
  const apiCallGet = async (url, config, handleError) => {
    const envUrl = `https://shopapi.liateam.com/api/rest/v1/get_categories`;
    try {
      const result = await axios.get(envUrl);
      if (result) {
        setItemsg(result.data);
        return result.data;
      }
      throw Error;
    } catch (error) {
      console.log(error);
    }
  };
  const apiCallGetCat = async (id) => {
    // setCurrent(id)
    const envUrl = `https://shopapi.liateam.com/api/rest/v1/get_product?categories=${id}`;
    try {
      const result = await axios.get(envUrl);
      if (result) {
        setItems(result.data.list);
        console.log(result.data.list);
        return result.data;
      }
      throw Error;
    } catch (error) {
      console.log(error);
    }
  };
  const getmeucat = (id) => {
    let itemarray = [];
    itemsg.map((item) =>
      item.id === id
        ? item.children.map((i) => itemarray.push({ name: i.name, key: i.id }))
        : { ...itemsgcat }
    );
    setItemsgcat(itemarray);
    console.log(itemsgcat);
  };
  const getmeu = () => {
    let itemarray = [];
    console.log(itemsgh);
    itemsg.map((i) => itemarray.push({ label: i.name, key: i.id }));
    setItemsgh(itemarray);
  };
  useEffect(() => {
    !itemsg && apiCallGet();
    itemsg && itemsgh.length === 0 && getmeu();
  }, [itemsg, itemsgh]);

  return (
    <>
      <div
        style={{
          height: "8rem",
          alignItems: "end",
          background: "#FFF",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.20)",
        }}
      >
        <div
          style={{
            display: "block",
            height: "4rem",
            padding: "15px 15px 0 15px",
          }}
        >
          <img
            style={{ cursor: "pointer", float: "right" }}
            src={Logo}
            alt=""
            onClick={() => onClicklogo()}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 0 0 15px",
            position: "relative",
          }}
        >
          <Badge count={t.cartItems}>
            <img
              src={shop}
              alt=""
              onClick={() => dispatch(toggleCartHidden())}
            ></img>
          </Badge>
          {hiddenCartItems && (
            <div
              style={{
                background: "#D9D9D9",
                position: "absolute",
                top: "60px",
                borderRadius: "15px",
                zIndex: "2",
                width: "400px",
              }}
            >
              {cartItems &&
                cartItems.map((i) => (
                  <Card
                    style={{
                      display: "flex",
                      direction: "rtl",
                      borderRadius: "0",
                    }}
                    cover={
                      <img
                        alt="example"
                        src={`https://shopapi.liateam.com${i.small_pic}`}
                        style={{
                          width: "150px",
                        }}
                      />
                    }
                  >
                    <Meta
                      title={i.title}
                      description={
                        <div>
                          <div
                            style={{
                              background: "#F7F7F7",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                background: "#F7F7F7",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <button
                                style={{
                                  width: "38px",
                                  height: "30px",
                                  background: "#F7F7F7",
                                  border: "none",
                                }}
                                onClick={() => dispatch(addItem(i))}
                              >
                                <img src={plus} alt="" />
                              </button>
                              <span
                                style={{
                                  width: "38px",
                                  height: "30px",
                                  background: "#F7F7F7",
                                  textAlign: "center",
                                }}
                              >
                                {i.quantity}
                              </span>
                              <button
                                style={{
                                  width: "38px",
                                  height: "30px",
                                  background: "#F7F7F7",
                                  border: "none",
                                }}
                                onClick={() => dispatch(removeItem(i))}
                              >
                                <img src={minus} alt="" />
                              </button>
                            </div>
                            <button
                              style={{
                                width: "38px",
                                height: "30px",
                                background: "#fff",
                                border: "none",
                              }}
                              onClick={() => dispatch(clearItemFromCart(i))}
                            >
                              <img src={trash} alt="" />
                            </button>
                          </div>
                          <div style={{ margin: "10px 0" }}>
                            <span style={{ marginLeft: "15px" }}>
                              {i.price &&
                                i.price.final_price &&
                                i.price.final_price}
                            </span>
                            <span>تومان</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                ))}

              {t.total !== 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem 1rem",
                  }}
                >
                  <span>{t.total}</span>
                  <span>جمع کل </span>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "1rem 1rem",
                  }}
                >
                  <span> آیتمی وارد نشده است </span>
                </div>
              )}
            </div>
          )}

          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsgh}
            style={{ direction: "rtl" }}
          />
        </div>
      </div>
      <div style={{ background: "#F7F7F7", padding: "4% 0", direction: "rtl" }}>
        {itemsg &&
          !itemsgcat &&
          itemsg.map((i) => (
            <Card
              onClick={() => onClickcat(i.id)}
              hoverable
              style={{
                display: "inline-block",
                width: "35%",
                margin: "2% 7%",
              }}
              cover={
                <img
                  alt="example"
                  src={`https://shopapi.liateam.com${i.image}`}
                />
              }
            >
              <Meta title={i.name} />
            </Card>
          ))}
        {itemsgcat &&
          !items &&
          itemsgcat.map((i) => (
            <Card
              onClick={() => apiCallGetCat(i.key)}
              hoverable
              style={{
                display: "inline-block",
                width: "35%",
                margin: "2% 7%",
              }}
              cover={<img alt="example" src={back} />}
            >
              <Meta title={i.name} />
            </Card>
          ))}
        {items &&
          items.map((i) => (
            <Card
              onClick={() => dispatch(addItem(i))}
              hoverable
              style={{
                display: "inline-block",
                width: "20%",
                margin: "2% 2.5%",
              }}
              cover={
                <img
                  alt="example"
                  src={`https://shopapi.liateam.com${i.small_pic}`}
                />
              }
            >
              <Meta
                style={{ textAlign: "right" }}
                title={i.title}
                description={
                  i.price && i.price.final_price && i.price.final_price
                }
              />
            </Card>
          ))}
      </div>
      <div
        style={{
          height: "7rem",
          alignItems: "end",
          background: "#FFF",
          padding: "2rem 50px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "4rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              width: "33%",
            }}
          >
            <span>لیا را در شبکه‌های اجتماعی دنبال کنید</span>
            <div
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                display: "flex",
                paddingTop: "15px",
              }}
            >
              <img src={aparat} alt="" />
              <img src={telegram} alt="" />
              <img src={instagram} alt="" />
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              width: "33%",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              تمامی حقوق این وب‌سایت متعلق به شرکت آرمان تدبیر اطلس 1398-1400
              می‌باشد
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              width: "33%",
            }}
          >
            <img
              style={{ cursor: "pointer", float: "right" }}
              src={LogoFooter}
              alt=""
              onClick={() => onClicklogo()}
            />
          </div>
        </div>
        <Divider></Divider>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem 0",
          }}
        >
          <span style={{ fontSize: "13px" }}>
            این شرکت هیچگونه وابستگی به ارگانها و نهادهای دولتی ، غیر دولتی و
            امنیتی ندارد.
          </span>
          <span style={{ fontSize: "13px" }}>
            شماره واحد بازرسی و نظارت بر واحد بازاریابی شبکه‌ای : 26421289-021 و
            26421197-021
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
