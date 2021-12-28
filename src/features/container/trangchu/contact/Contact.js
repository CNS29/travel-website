import React from "react";

import "./contact.css";
import Footer from "../footer/Footer";

const Contact = () => {
  return (
    <div className="contact margin_header">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62694.93338362761!2d106.71814504787886!3d10.85460847067429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d85e042bf04b%3A0xbb26baec1664394d!2zVGjhu6cgxJDhu6ljLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1640569558042!5m2!1svi!2s"></iframe>
      <div className="container contact_wrapper">
        <img
          src="http://mauweb.monamedia.net/lets-travel/wp-content/uploads/2018/02/bg-section-contact-1024x533.jpg"
          alt=""
        />
        <div className="contact_form text-center">
          <h3>Contact Us</h3>
          <p>Just pack and go! Let leave your travel plan to travel experts!</p>
          <div className="form_group">
            <input type="text" placeholder="Họ và tên" />
            <input type="text" placeholder="Email" />
            <textarea
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              placeholder="Nhập nội dung"
            ></textarea>
          </div>
          <button className="btn btn-warning mt-3">Gửi tin nhắn</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
