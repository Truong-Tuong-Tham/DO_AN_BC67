import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {visible && (
        <Button
          type="background"
          shape="circle"
          icon={<UpOutlined />}
          onClick={scrollToTop}
          className="shadow-lg bg-teal-600 text-white  hover:bg-teal-700 transition duration-300"
        />
      )}
    </div>
  );
};

export default BackToTop;
