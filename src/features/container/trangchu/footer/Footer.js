import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./footer.css";
function Footer() {
  const contact = useSelector((state) => state.lienhe.lienhe.data);
  const social = useSelector((state) => state.mangxahoi.mangxahoi.data);
  const [data, setData] = useState({
    contact: null,
    social: null,
  });

  useEffect(() => {
    function saveData(list, key) {
      if (!list) return;
      const newData = [];
      for (const item of list) {
        item.status === 1 && newData.push(item);
      }
      setData((prev) => ({
        ...prev,
        [key]: newData,
      }));
    }

    saveData(contact, "contact");
    saveData(social, "social");
  }, [contact, social]);

  return (
    <footer id="footer">
      <div className="container">
        <div className="row g-3">
          <div className="col-md-4">
            <h5 className="footer_title">Về chúng tôi</h5>
            {data.contact &&
              data.contact.map((item) => <p key={item.id}>{item.content}</p>)}
          </div>
          <div className="col-md-4">
            <h5 className="footer_title">Liên hệ</h5>
            {data.contact &&
              data.contact.map((item) => (
                <div key={item.id}>
                  <p>
                    <strong>Email: </strong>
                    <i>{item.email}</i>
                  </p>
                  <p>
                    <strong>Phone Number: </strong>
                    <i>{item.sdt}</i>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    <i>{item.diachi}</i>
                  </p>
                </div>
              ))}
          </div>
          <div className="col-md-4 ">
            <h5 className="footer_title">Mạng xã hội</h5>
            <div className="footer_icon">
              {data.social &&
                data.social.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className="icon_footer"
                      style={{
                        background: `${item.color}`,
                        cursor: "pointer",
                      }}
                    >
                      <i className={`${item.icon}`}></i>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {};

export default Footer;
